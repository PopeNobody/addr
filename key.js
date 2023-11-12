import { mnemonic } from './mnemonic.js';
import coininfo from 'coininfo';
import { mnemonicToSeed } from 'bip39';
import { deriveHdPrivateNodeFromSeed } from '@bitauth/libauth';
async function run() {
    class HDRoot {
        root;
        seed;
        acct;
        constructor(seed) {
            this.acct = {};
            this.seed = seed;
            this.root = deriveHdPrivateNodeFromSeed(this.seed);
        }
    }
    const seed = await mnemonicToSeed(mnemonic);
    const root = new HDRoot(seed);
    class Chain {
        sym;
        info;
        constructor(sym) {
            this.sym = sym;
            this.info = coininfo(sym);
            console.log(this);
        }
    }
    class Chains {
        chains = new Map();
        Chains() {
            const chains = ["btc", "bch", "dash"];
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
            return this.get(sym);
        }
    }
    const chains = new Chains();
    console.log(chains.get("bch"));
    console.log(chains.get("btc"));
    console.log(chains);
    return "done";
}
run().then(console.log).catch(console.error);
// class Account {
// }
// class Wallet {
//   readonly root : HDRoot ;
//   readonly coins : Map<string,Coin> ;
//   constructor(root : HDRoot , coins : Coin[] ) {
//     this.root=root;
//     this.coins=new Map<string, Coin>();
//     for(const coin of coins ) {
//       const sym=coin.sym;
//     }
// }
// getCoin(sym : string) {
//   }
// }
//new Wallet(seed);
// global.keys=Object.keys;
// interface CoinMap {
//   [key: string], Coin;
// }
// class Coin {
//   keys=[];
//   getKey(idx) {
//     if(!this.keys[idx]) {
//       this.keys[idx]=new Key(this,idx);
//     }
//     return this.keys[idx];
//   }
//   // getAddr(idx) {
//   //   const prv=this.getPrivateKey(idx)
//   //   const pub =
//   //       secp256k1.derivePublicKeyCompressed(prv);
//   //   const pkh = hash160(pub);
//   // }
//   constructor(sym) {
//     this.sym=sym;
//     this.ci = coininfo(sym)
//   }
//   get base(){
//     return bases[this.sym];
//   }
// }
// class Key {
//   constructor(coin, idx) {
//     this.coin=coin;
//     this.path=this.coin.base+idx;
//     this.node=deriveHdPath(root, this.path);
//     this.privateKey=this.node.privateKey;
//     this.publicKey=secp256k1.derivePublicKeyCompressed(
//         this.privateKey);
//     this.ck=CoinKey(this.privateKey,coin.ci);
//     this.publicAddress=this.ck.publicAddress;
//     if(coin.sym === "bch") {
//       const prefix = 'bitcoincash';
//       const addrType = 'p2pkh';
//       this.legacyAddress=this.publicAddress;
//       this.publicAddress=encodeCashAddress(prefix, addrType, pkh);
//     }
//   }
// }
//
// list.forEach((coin)=>{
//   list[coin]=new Coin(coin);
// });
// const addr = {};
// list.forEach((sym)=>{
//   const coin = list[sym];
//   const key = coin.getKey(0);
//   addr[coin]={
//     addr: key.publicAddress,
//     legacy:   key.legacyAddress,
//     publicKey: key.publicKey,
//   };
// });
// console.log(addr);
// //const addrs=[];
// //for(let i=0;i<20;i++) {
// //  const bchAddr = derive(derivationBase+i, addrType, prefix);
// //  addrs.push(bchAddr)
// //  fs.writeFileSync("BCH.addr.txt",addrs.join("\n")+"\n");
// //}
