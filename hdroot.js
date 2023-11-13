import {deriveHdPath, deriveHdPrivateNodeFromSeed} from "@bitauth/libauth";

export class HDRoot {
    root;
    seed;
    acct;
    constructor(seed) {
        this.acct = {};
        this.seed = seed;
        this.root = deriveHdPrivateNodeFromSeed(this.seed);
    }
    getPrivateKey(chain, idx) {
        const sym = chain.sym;
        const path = chain.derivationPath+idx;
        const root = this.root;
        const node = deriveHdPath(root,path);
        return node.privateKey;
    }
}
