import fs from 'fs';
import {hash160} from '@cashscript/utils';
import {deriveHdPath, deriveHdPrivateNodeFromSeed, encodeCashAddress, secp256k1,} from '@bitauth/libauth';
import {mnemonicToSeed} from 'bip39';
import fetch from 'node-fetch';
import {writeFileSync} from "fs";
// Generate entropy from BIP39 mnemonic phrase and initialise a root
// HD-wallet node
class Wallet {
}
import { mnemonic } from './calcMnemonic.js';
const seed = await mnemonicToSeed(mnemonic.join(" "));
function readJson(name) {
  const buf = fs.readFileSync(name);
  const str = buf.toString();
  const obj = JSON.parse(str);
  console.log(obj);
  return obj;
}
const derivationBase = "m/44'/145'/0'/0/";
const prefix= 'bitcoincash';
const addrType = 'p2pkh';
function derive(path, addrType, prefix) {
  const rootNode= deriveHdPrivateNodeFromSeed(seed, true);
  const aliceNode = deriveHdPath(rootNode, path);
  const alicePub = secp256k1.derivePublicKeyCompressed(aliceNode.privateKey);
  const alicePkh = hash160(alicePub);
  const aliceAddr = encodeCashAddress(prefix, addrType, alicePkh);
  return aliceAddr;
}
const addrs=[];
for(let i=0;i<20;i++) {
  const bchAddr = derive(derivationBase+i, addrType, prefix);
  addrs.push(bchAddr)
  fs.writeFileSync("BCH.addr.txt",addrs.join("\n")+"\n");
}
if(new Date().getTime()===0) {
  const url = "http://localhost/";
  const response = await fetch(url);
  const body = await response.text();
  writeFileSync('body.html', body);
}
