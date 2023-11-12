import coininfo from "coininfo";

export class Chain {
    sym;
    info;
    constructor(sym) {
        this.sym = sym;
        this.info = coininfo(sym);
    }
}
export class Chains {
    chains;
    constructor() {
        this.chains = new Map();
        const chains = coininfo;
        for (const chain of chains) {
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
