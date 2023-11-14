/* eslint-disable @typescript-eslint/no-unused-vars */
import {mnemonic} from './mnemonic.js';
import {mnemonicToSeedSync} from 'bip39';
import {getType, hex, readJson, u8a} from './util.js';
import {readdirSync} from "fs";
import {
    CashAddressNetworkPrefix,
    CashAddressType,
    deriveHdPath,
    deriveHdPrivateNodeFromSeed,
    encodeCashAddress,
    hash160,
    HdPrivateNodeValid,
    secp256k1
} from "@bitauth/libauth";

interface AddressFormat {
   format(address: Uint8Array) : string;
}
class BitcoinCashFormat implements AddressFormat {
    type = CashAddressType.p2pkh;
    prefix: CashAddressNetworkPrefix = CashAddressNetworkPrefix.mainnet;
    format(publicKeyHash: Uint8Array) {
        return encodeCashAddress(this.prefix,this.type ,publicKeyHash);
    }
}

export class Chain {
    sym: string;
    hashGenesisBlock: string;
    port: number;
    portRpc: number;
    magic: number;
    seedDns: [];
    versions: Map<string,number>;
    name: string;
    per1: number;
    derivationPath;
    constructor(file : string) {
        if(!(this instanceof Chain))
            throw new Error("Not a Chain.  Call with new");
        const data = readJson(file);
        this.sym = data.unit.toLowerCase();
        this.hashGenesisBlock=data.hashGenesisBlock;
        this.port=data.port;
        this.portRpc=data.portRpc;
        this.magic=data.magic;
        this.seedDns=data.seedDns;
        this.versions=data.versions;
        this.name=data.name;
        this.per1=data.per1;
        const bip44 = data.versions["bip44"];
        this.derivationPath=`m/44'/${bip44}'/0'/0`;
    }
    formats = [
        new BitcoinCashFormat()
    ];
    formatAddress(publicKeyHash: Uint8Array ) {
        const format = this.formats[0];
        if(format)
            return format.format(publicKeyHash);
        else
            throw new Error("No Format!");

    }
}
function getChain(sym: string): Chain {
    const chain = chains.get(sym);
    if (!chain)
        throw new Error("No chain for sym: " + sym);
    return chain;
}

function loadChains() : Map<string,Chain>
{
    const chains = new Map<string,Chain>;
    const dir="chains/main";
    const files = readdirSync(dir).map(base=>{
        return dir+"/"+base;
    });
    for(const file of files) {
        if(!file.endsWith(".json"))
            continue;
        try {
            const chain = new Chain(file);
            chains.set(chain.sym, chain);
        } catch ( tmp ) {
            const err = <Error>tmp;
            console.log(getType(err));
            const keys = Object.keys(err);
            console.log(keys);
        }
    }
    return chains;
}
const chains = loadChains();
//const bch = new Chain("chains/main/bch.json");
class Node {
    constructor(account : Account, idx : number)
    {
        this._idx=idx;
        this._account=account;
        this._node = this.deriveNode();
    }
    private readonly _idx: number;
    _account: Account;
    get account() {
        return this._account;
    }
    _node: HdPrivateNodeValid;
    get node() {
        return this._node;
    }
    _privateKey? : Uint8Array;
    get privateKey(): Uint8Array {
        return this._privateKey ||= this.node.privateKey;
    }
    _publicKey? : Uint8Array;
    get publicKey() : Uint8Array {
        if(!this._publicKey) {
            this._publicKey=
                u8a(secp256k1.derivePublicKeyCompressed(this.privateKey));
        }
        return this._publicKey;
    }
    get idx(): number {
        return this._idx;
    }
    get derivationPath(): string {
        const account = this.account;
        return account?.getDerivationPath()+"/"+this.idx;
    }
    private deriveNode() {
        return <HdPrivateNodeValid>deriveHdPath(
            this.account.root, this.derivationPath);
    }
    _publicKeyHash?: Uint8Array;
    get publicKeyHash() : Uint8Array{
        if(!this._publicKeyHash) {
            this._publicKeyHash||=hash160(u8a(this.publicKey));
        }
        return this._publicKeyHash;
    }
    _address?: string;
    get address() {
        return this._address||=
            this.account.chain.formatAddress(this.publicKeyHash);
    }
}
class Account {
    chain: Chain;
    root: HdPrivateNodeValid;
    addresses = new Array<Node>();
    constructor(root : HdPrivateNodeValid, sym: string) {
        this.root=root;
        this.chain=getChain(sym);
    }
    getNode(idx: number) : Node {
        if (!this.addresses[idx])
            this.addresses[idx] = new Node(this,idx);
        return this.addresses[idx];
    }

    getDerivationPath() {
        return this.chain.derivationPath;
    }

    getAddress(idx: number) {
        const node = this.getNode(idx);
        return node.address;
    }
}

class Wallet {
    readonly seed: Buffer;
    readonly node:  HdPrivateNodeValid;
    accounts = new Map<string, Account>();
    constructor(syms: string[]) {
        this.seed = mnemonicToSeedSync(mnemonic);
        console.log("sd:"+hex(this.seed));
        const node = deriveHdPrivateNodeFromSeed(this.seed);
        this.node = <HdPrivateNodeValid>node;
        console.log("cc:"+hex(this.node.chainCode));
        for(let i=0;i<syms.length;i++) {
            const sym = syms[i];
            const account = new Account(this.node,sym);
            this.accounts.set(sym,account);
        }
    }

    getAccount(bch: string) {
        const account = this.accounts.get(bch);
        if(account==null)
            throw new Error("account not found");
        return account;
    }
}
const list = [ "bch" ];
const wallet = new Wallet(list);
const account=wallet.getAccount("bch");
const address = account.getAddress(0);
console.log("address: ", address);
