import './saveCoin.js';
import { mnemonic } from './mnemonic.js';
import coininfo from "./coininfo.cjs";
import { mnemonicToSeed } from 'bip39';
import { deriveHdPrivateNodeFromSeed } from '@bitauth/libauth';
import {chains} from "./chains.js";
import {HDRoot} from "./hdroot.js";
import CoinKey from 'coinkey';
import {writeFileSync} from "fs";
async function run() {
    const seed = await mnemonicToSeed(mnemonic);
    const root = new HDRoot(seed);
    const btc = chains.get("btc");
    const key = new CoinKey()
    console.log(btc);
    console.log(btc.sym);
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
