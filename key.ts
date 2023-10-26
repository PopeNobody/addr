import { mnemonic } from './mnemonic.js'
// import {
//   deriveHdPath,
//   deriveHdPrivateNodeFromSeed,
//   encodeCashAddress,
//   secp256k1
// } from '@bitauth/libauth';
import {mnemonicToSeed} from 'bip39';

const seed: string = await mnemonicToSeed(mnemonic).then(seed=>{
  return seed.toString();
});

import coininfo from 'coininfo';
class Coin {
  symbol: string;
  constructor(symbol : string) {
    this.symbol=symbol;
  }
}

// // import {hash160} from '@cashscript/utils';
//class Wallet {
//  seed: Uint8Array;
//  constructor(seed) {
//    this.seed=seed;
//    const root = deriveHdPrivateNodeFromSeed(seed, true);
//  }
//}
//new Wallet(seed);
// import coininfo from 'coininfo';
// import CoinKey from 'coinkey';
// global.keys=Object.keys;
// interface CoinMap {
//   [key: string], Coin;
// }
// const list = [ 'bch', 'btc', 'dash', 'doge', 'ltc' ];
// const bases={
//   bch:"m/44'/145'/0'/0/",
//   btc:"m/44'/145'/0'/0/",
//   doge:"m/44'/145'/0'/0/",
//   dash:"m/44'/145'/0'/0/",
//   lts:"m/44'/145'/0'/0/"
// }
//
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
