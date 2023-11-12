import {deriveHdPrivateNodeFromSeed} from "@bitauth/libauth";

export class HDRoot {
    root;
    seed;
    acct;
    constructor(seed) {
        this.acct = {};
        this.seed = seed;
        this.root = deriveHdPrivateNodeFromSeed(this.seed);
    }
}
