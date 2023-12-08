import {readJson} from "./util.js";
import {readdirSync} from "fs";
import {AddressFormat, getFormats} from './format.js';

export class Chain {
    sym: string;
    versions: Map<string,number>;
    name: string;
    per1: number;
    derivationPath;
    formats: Map<string,AddressFormat>;
    style: string;
    constructor(file : string) {
        if(!(this instanceof Chain))
            throw new Error("Not a Chain.  Call with new");
        const data = readJson(file);
        this.sym = data.unit.toLowerCase();
        if(this.sym==="bch")
          this.style="cashaddr";
        else
          this.style="legacy";
        this.versions=data.versions;
        this.name=data.name;
        this.per1=data.per1;
        const bip44 = data.versions.bip44;
        this.derivationPath=`m/44'/${bip44}'/0'/0`;
        this.formats = getFormats(this.sym);
    }
    formatAddress(publicKeyHash: Uint8Array ) {
        const format = this.formats.get(this.style);
        if(format)
            return format.format(publicKeyHash);
        else
            throw new Error("No Format!");

    }
    static getChain(sym: string): Chain {
        const chain = Chain.chains.get(sym);
        if(!chain) {
          const chains=Chain.chains;
          console.log({chains});
          throw new Error("No Such Chain: "+sym);
        }
        return chain;
    }
    private static loadChains() : Map<string,Chain>
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
          const sym=chain.sym;
          console.log({file,sym});
          chains.set(chain.sym, chain);
        } catch ( tmp ) {
          const err = <Error>tmp;
          console.error({err});
          throw tmp;
        }
      }
      return chains;
    }
    private static chains = Chain.loadChains();
}
