/* eslint-disable @typescript-eslint/no-unused-vars */
import { mnemonic } from './mnemonic.js';
import { mnemonicToSeedSync } from 'bip39';
import { u8a } from './util.js';
import { deriveHdPath, deriveHdPrivateNodeFromSeed, hash160, secp256k1 } from "@bitauth/libauth";
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
        const node = deriveHdPrivateNodeFromSeed(this.seed);
        this.node = node;
        for (let i = 0; i < syms.length; i++) {
            const sym = syms[i];
            const account = new Account(this.node, sym);
            this.accounts.set(sym, account);
        }
    }
    getSymbols() {
        return [...this.accounts.keys()];
    }
    getAccount(bch) {
        const account = this.accounts.get(bch);
        if (account == null)
            throw new Error("account not found");
        return account;
    }
    showAddrs() {
        for (const ac of Array.from(this.accounts.values())) {
            console.log(ac.addresses);
        }
    }
}
const list = ["bch", "btc"];
const wallet = new Wallet(list);
list.forEach(sym => {
    const chain = wallet.getAccount(sym);
    console.log(chain.getAddress(0));
});
//# sourceMappingURL=run.js.map