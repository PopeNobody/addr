import readdirSync from "recursive-readdir-sync";
import {readFileSync} from "fs";
import cs from 'coinstring';

function derivationPath(coin) {
    return `m/44'/${coin}'/0'/0'/`
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

    constructor(data) {
        if(!this instanceof Chain)
            throw new Error("Not a Chain.  Call with new");
        this.sym = data.unit.toLowerCase();
        this.hashGenesisBlock=data.hashGenesisBlock;
        this.port=data.port;
        this.portRpc=data.portRpc;
        this.magic=data.magic;
        this.seedDns=data.seedDns;
        this.versions=data.versions;
        this.name=data.name;
        this.per1=data.per1;
        this.derivationPath=derivationPath(data.versions['bip44']);
    }
}
function readCoins() {
    let dirents =readdirSync("chains", {withFileTypes: true});
    const dirs={};
    for(const dirent of dirents) {
        if(!dirent.endsWith(".json")) {
            console.log("skipping: "+dirent);
            continue;
        }
        const coin = JSON.parse(readFileSync(dirent).toString());
        const segs = dirent.split("/");
        if(segs.length!==3) {
            console.log("wombat: ",segs);
            continue;
        }
        const net = segs[1];
        if(!dirs[net])
            dirs[net]=[];
        dirs[net].push(coin);
    }
    return dirs;
}
export class Chains {
    chains;
    constructor(net) {
        this.chains = new Map();
        const data = readCoins();
        const list = data[net];
        for(const item of list) {
            const chain =new Chain(item);
            this.chains.set(chain.sym,chain);
        }
    }
    get(sym) {
        return this.chains.get(sym);
    }
}
// function pubKeyAddress(root,chain) {
//     let bufVersion = bufferizeVersion(chains.versions.public)
//     return cs.encode(this.pubKeyHash, bufVersion)
// }
function clone (obj) {
    return JSON.parse(JSON.stringify(obj))
}

function isArrayish (maybeArray) {
    return Array.isArray(maybeArray) ||
        (maybeArray instanceof Uint8Array) ||
        Buffer.isBuffer(maybeArray)
}

// versions === { private, public } ? if no, check '.version(s)'
function normalizeVersions (versions) {
    if (!versions) return null
    if (typeof versions !== 'object') return null
    versions = clone(versions)
    if (versions.version) versions.versions = versions.version
    // check for actual versions object
    if (versions && 'private' in versions) return versions
    // if it exists, maybe in .versions?
    else versions = versions.versions
    if (versions && 'private' in versions) return versions
    else return null
}

function bufferizeVersion (version) {
    if (typeof version === 'string') return hexStringToBuffer(version)
    if (typeof version === 'number') return beUIntToBuffer(version)
    throw new Error('invalid version type.')
}

// accepts hex string sequence with or without 0x prefix
const isValidRE = /^([\dA-Fa-f]{2})+$/g
function hexStringToBuffer (input)
{
    input=input.trim();
    if(input.startsWith("0x"))
        input=input.slice(2);
    if (!isValidRE.test(input))
        throw new Error('invalid hex string.')
    return Buffer.from(input);
}

function bitsInNum(num) {
    if (num < 0 )
        throw new Error("bitsINum called on negative value");
    if (num === 0)
        return 1;
    return Math.ceil((Math.log(num + 1) / Math.log(2)) / 8)
}
function beUIntToBuffer (num) {
    const length=bitsInNum(num);
    const buf = Buffer.alloc(length)
    buf.writeUIntBE(num, 0, length)
    return buf
}
export const chains = new Chains("main");
