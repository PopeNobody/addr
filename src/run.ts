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
    hash160, hash256,
    HdPrivateNodeValid,
    secp256k1, binToBase58
} from "@bitauth/libauth";


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
        const node = deriveHdPrivateNodeFromSeed(this.seed);
        this.node = <HdPrivateNodeValid>node;
        for(let i=0;i<syms.length;i++) {
            const sym = syms[i];
            const account = new Account(this.node,sym);
            this.accounts.set(sym,account);
        }
    }
    getSymbols() {
      return [ ... this.accounts.keys() ];
    }
    getAccount(bch: string) {
        const account = this.accounts.get(bch);
        if(account==null)
            throw new Error("account not found");
        return account;
    }
    showAddrs() {
      for( const ac of Array.from(this.accounts.values())){
        console.log(ac.addresses);
      }
    }
}
const list = [ "bch","btc" ];
const wallet = new Wallet(list);
list.forEach(sym=>{
    const chain = wallet.getAccount(sym);
    console.log(chain.getAddress(0));
});
