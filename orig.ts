// @ts-ignore
import { mnemonic } from './mnemonic.js';
import {hash160} from '@cashscript/utils';
import {deriveHdPath, deriveHdPrivateNodeFromSeed, encodeCashAddress, secp256k1,} from '@bitauth/libauth';
import {mnemonicToSeed} from 'bip39';
import {writeFileSync} from "fs";
const seed = await mnemonicToSeed(mnemonic);
// // function readJson(name) {
// //   const buf = fs.readFileSync(name);
// //   const str = buf.toString();
// //   const obj = JSON.parse(str);
// //   console.log(obj);
// //   return obj;
// // }
const derivationBase = "m/44'/145'/0'/0/";
const prefix= 'bitcoincash';
const addrType = 'p2pkh';
//
import { u8a } from './util.js';
function derive(path, addrType, prefix) {
  const rootNode= deriveHdPrivateNodeFromSeed(seed, true);
  const aliceNode = deriveHdPath(rootNode, path);
  const privateKey = u8a(aliceNode.privateKey);
  const alicePub =
      secp256k1.derivePublicKeyCompressed(privateKey);
  const alicePkh = hash160(alicePub);
  return encodeCashAddress(prefix, addrType, alicePkh);
}
const addrs=[];
console.log({mnemonic})
for(let i=0;i<20;i++) {
  const bchAddr = derive(derivationBase+i, addrType, prefix);
  console.log(bchAddr);
  addrs.push(bchAddr)
  writeFileSync("BCH.addr.txt",addrs.join("\n")+"\n");
}
// if(new Date().getTime()===0) {
//   const url = "http://localhost/";
//   const response = await fetch(url);
//   const body = await response.text();
//   writeFileSync('body.html', body);
// }
