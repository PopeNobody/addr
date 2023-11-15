import {getType, readJson} from "./util";
import {readdirSync} from "fs";

class Chain {
    sym: string;
    versions: Map<string,number>;
    name: string;
    per1: number;
    derivationPath;
    formats;
    constructor(file : string) {
        if(!(this instanceof Chain))
            throw new Error("Not a Chain.  Call with new");
        const data = readJson(file);
        this.sym = data.unit.toLowerCase();
        this.versions=data.versions;
        this.name=data.name;
        this.per1=data.per1;
        const bip44 = data.versions["bip44"];
        this.derivationPath=`m/44'/${bip44}'/0'/0`;
        const formats=[];
        if(this.sym==='bch') {
            formats.push(new BitcoinCashFormat());
        } else {
            formats.push(new BitcoinFormat());
        }
        this.formats=formats;
    }
    formatAddress(publicKeyHash: Uint8Array ) {
        const format = this.formats[0];
        if(format)
            return format.format(publicKeyHash);
        else
            throw new Error("No Format!");

    }
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
function getChain(sym: string): Chain {
    const chain = chains.get(sym);
    if (!chain)
        throw new Error("No chain for sym: " + sym);
    return chain;
}
