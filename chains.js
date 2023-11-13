import coininfo from "./coininfo.cjs";

export class Chain {
    sym;
    info;
    constructor(sym) {
        this.sym = sym;
        this.info = coininfo[sym];
    }
}
export class Chains {
    chains;
    constructor() {
        this.chains = new Map();
        for (const chain of Object.keys(coininfo)) {
            console.log(chain);
            this.create(chain);
        }
    }
    get(sym) {
        return this.chains.get(sym);
    }
    create(sym) {
        const old = this.get(sym);
        if (old)
            throw new Error(`chain ${sym} already exists`);
        this.chains.set(sym, new Chain(sym));
        return this.chains.get(sym);
    }
}
export const chains = new Chains();
