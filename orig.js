// @ts-ignore
import { mnemonic } from './dist/calcMnemonic.js';
console.log(mnemonic);
// //import fs from 'fs';
// import {hash160} from '@cashscript/utils';
// import {deriveHdPath, deriveHdPrivateNodeFromSeed, encodeCashAddress ,} from '@bitauth/libauth';
// import {mnemonicToSeed} from 'bip39';
// import fetch from 'node-fetch';
// import {writeFileSync} from "fs";
// // Generate entropy from BIP39 mnemonic phrase and initialise a root
// // HD-wallet node
// console.log("loaded mnemonic");
// const seed = await mnemonicToSeed(mnemonic.join(" "));
// // function readJson(name) {
// //   const buf = fs.readFileSync(name);
// //   const str = buf.toString();
// //   const obj = JSON.parse(str);
// //   console.log(obj);
// //   return obj;
// // }
// const derivationBase = "m/44'/145'/0'/0/";
// const prefix= 'bitcoincash';
// const addrType = 'p2pkh';
//
// function u8a(maybeString) {
//   if (maybeString instanceof Uint8Array) {
//     return maybeString;
//   } else if (typeof (maybeString) === 'string') {
//     const res = new Uint8Array(maybeString.length);
//     new TextEncoder().encodeInto(maybeString, res);
//     return res;
//   } else {
//     return u8a(maybeString.toString());
//   }
// }
//
// function derive(path, addrType, prefix) {
//   const rootNode= deriveHdPrivateNodeFromSeed(seed, true);
//   const aliceNode = deriveHdPath(rootNode, path);
//   const privateKey = u8a(aliceNode.privateKey);
//   const alicePub =
//       usecp256k1.derivePublicKeyCompressed(privateKey);
//   const alicePkh = hash160(alicePub);
//   return encodeCashAddress(prefix, addrType, alicePkh);
// }
// const addrs=[];
// for(let i=0;i<20;i++) {
//   const bchAddr = derive(derivationBase+i, addrType, prefix);
//   addrs.push(bchAddr)
//   writeFileSync("BCH.addr.txt",addrs.join("\n")+"\n");
// }
// if(new Date().getTime()===0) {
//   const url = "http://localhost/";
//   const response = await fetch(url);
//   const body = await response.text();
//   writeFileSync('body.html', body);
// }
