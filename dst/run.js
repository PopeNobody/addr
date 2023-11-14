/* eslint-disable @typescript-eslint/no-unused-vars */
import { mnemonic } from './mnemonic.js';
import { mnemonicToSeedSync } from 'bip39';
import { getType, hex, readJson, u8a } from './util.js';
import { readdirSync } from "fs";
import { CashAddressNetworkPrefix, CashAddressType, deriveHdPath, deriveHdPrivateNodeFromSeed, encodeCashAddress, hash160, secp256k1 } from "@bitauth/libauth";
class BitcoinCashFormat {
    type = CashAddressType.p2pkh;
    prefix = CashAddressNetworkPrefix.mainnet;
    format(publicKeyHash) {
        return encodeCashAddress(this.prefix, this.type, publicKeyHash);
    }
}
export class Chain {
    sym;
    hashGenesisBlock;
    port;
    portRpc;
    magic;
    seedDns;
    versions;
    name;
    per1;
    derivationPath;
    constructor(file) {
        if (!(this instanceof Chain))
            throw new Error("Not a Chain.  Call with new");
        const data = readJson(file);
        this.sym = data.unit.toLowerCase();
        this.hashGenesisBlock = data.hashGenesisBlock;
        this.port = data.port;
        this.portRpc = data.portRpc;
        this.magic = data.magic;
        this.seedDns = data.seedDns;
        this.versions = data.versions;
        this.name = data.name;
        this.per1 = data.per1;
        const bip44 = data.versions["bip44"];
        this.derivationPath = `m/44'/${bip44}'/0'/0`;
    }
    formats = [
        new BitcoinCashFormat()
    ];
    formatAddress(publicKeyHash) {
        const format = this.formats[0];
        if (format)
            return format.format(publicKeyHash);
        else
            throw new Error("No Format!");
    }
}
function getChain(sym) {
    const chain = chains.get(sym);
    if (!chain)
        throw new Error("No chain for sym: " + sym);
    return chain;
}
function loadChains() {
    const chains = new Map;
    const dir = "chains/main";
    const files = readdirSync(dir).map(base => {
        return dir + "/" + base;
    });
    for (const file of files) {
        if (!file.endsWith(".json"))
            continue;
        try {
            const chain = new Chain(file);
            chains.set(chain.sym, chain);
        }
        catch (tmp) {
            const err = tmp;
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
    constructor(account, idx) {
        this._idx = idx;
        this._account = account;
        this._node = this.deriveNode();
    }
    _idx;
    _account;
    get account() {
        return this._account;
    }
    _node;
    get node() {
        return this._node;
    }
    _privateKey;
    get privateKey() {
        return this._privateKey ||= this.node.privateKey;
    }
    _publicKey;
    get publicKey() {
        if (!this._publicKey) {
            this._publicKey =
                u8a(secp256k1.derivePublicKeyCompressed(this.privateKey));
        }
        return this._publicKey;
    }
    get idx() {
        return this._idx;
    }
    get derivationPath() {
        const account = this.account;
        return account?.getDerivationPath() + "/" + this.idx;
    }
    deriveNode() {
        return deriveHdPath(this.account.root, this.derivationPath);
    }
    _publicKeyHash;
    get publicKeyHash() {
        if (!this._publicKeyHash) {
            this._publicKeyHash ||= hash160(u8a(this.publicKey));
        }
        return this._publicKeyHash;
    }
    _address;
    get address() {
        return this._address ||=
            this.account.chain.formatAddress(this.publicKeyHash);
    }
}
class Account {
    chain;
    root;
    addresses = new Array();
    constructor(root, sym) {
        this.root = root;
        this.chain = getChain(sym);
    }
    getNode(idx) {
        if (!this.addresses[idx])
            this.addresses[idx] = new Node(this, idx);
        return this.addresses[idx];
    }
    getDerivationPath() {
        return this.chain.derivationPath;
    }
    getAddress(idx) {
        const node = this.getNode(idx);
        return node.address;
    }
}
class Wallet {
    seed;
    node;
    accounts = new Map();
    constructor(syms) {
        this.seed = mnemonicToSeedSync(mnemonic);
        console.log("sd:" + hex(this.seed));
        const node = deriveHdPrivateNodeFromSeed(this.seed);
        this.node = node;
        console.log("cc:" + hex(this.node.chainCode));
        for (let i = 0; i < syms.length; i++) {
            const sym = syms[i];
            const account = new Account(this.node, sym);
            this.accounts.set(sym, account);
        }
    }
    getAccount(bch) {
        const account = this.accounts.get(bch);
        if (account == null)
            throw new Error("account not found");
        return account;
    }
}
const list = ["bch"];
const wallet = new Wallet(list);
const account = wallet.getAccount("bch");
const address = account.getAddress(0);
console.log("address: ", address);
//# sourceMappingURL=run.js.map