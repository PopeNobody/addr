console.log("test");
//import readdirSync from "recursive-readdir-sync";
//import {readFileSync} from "fs";
//
//function derivationPath(coin) {
//    return `m/44'/${coin}'/0'/0'/`
//}
//export class Chain {
//    sym;
//    hashGenesisBlock;
//    port;
//    portRpc;
//    magic;
//    seedDns;
//    versions;
//    name;
//    per1;
//    derivationPath;
//
//    constructor(data) {
//        if(!this instanceof Chain)
//            throw new Error("Not a Chain.  Call with new");
//        this.sym = data.unit.toLowerCase();
//        this.hashGenesisBlock=data.hashGenesisBlock;
//        this.port=data.port;
//        this.portRpc=data.portRpc;
//        this.magic=data.magic;
//        this.seedDns=data.seedDns;
//        this.versions=data.versions;
//        this.name=data.name;
//        this.per1=data.per1;
//        this.derivationPath=derivationPath(data.versions['bip44']);
//    }
//}
//function readCoins() {
//    let dirents =readdirSync("chains", {withFileTypes: true});
//    const dirs={};
//    for(const dirent of dirents) {
//        if(!dirent.endsWith(".json")) {
//            console.log("skipping: "+dirent);
//            continue;
//        }
//        const coin = JSON.parse(readFileSync(dirent).toString());
//        const segs = dirent.split("/");
//        if(segs.length!==3) {
//            console.log("wombat: ",segs);
//            continue;
//        }
//        const net = segs[1];
//        if(!dirs[net])
//            dirs[net]=[];
//        dirs[net].push(coin);
//    }
//    return dirs;
//}
//export class Chains {
//    chains;
//    constructor(net) {
//        this.chains = new Map();
//        const data = readCoins();
//        const list = data[net];
//        for(const item of list) {
//            const chain =new Chain(item);
//            this.chains.set(chain.sym,chain);
//        }
//    }
//}
//export const chains = new Chains("main");
