// @ts-ignore
import { hash160 } from '@cashscript/utils';
import { deriveHdPath, deriveHdPrivateNodeFromSeed, encodeCashAddress, secp256k1, } from '@bitauth/libauth';
import { mnemonicToSeedSync} from 'bip39';
import { writeFileSync } from "fs";
const mnemonic =
    "fossil remain bless drum tail oblige custom adjust west device stable surround";
const derivationBase = "m/44'/145'/0'/0/";
const prefix = 'bitcoincash';
const addrType = 'p2pkh';
import { hex,u8a } from './util.js';
function derive(path, addrType, prefix) {
  console.log("enter");
  const seed = mnemonicToSeedSync(mnemonic);
  console.log("sd:"+hex(seed));
  const rootNode = deriveHdPrivateNodeFromSeed(seed, true);
  console.log("cc:"+hex(rootNode.chainCode));
  console.log("rn:",rootNode);
  console.log("dp:",path);
  const aliceNode =
    deriveHdPath(rootNode, path);
  console.log("cn:",hex(aliceNode));
  const privateKey = u8a(aliceNode.privateKey);
  console.log("cn.pk:", hex(privateKey));
  const alicePub = secp256k1.derivePublicKeyCompressed(privateKey);
  console.log("cn.pub:",hex(alicePub));
  const alicePkh = hash160(u8a(alicePub));
  console.log("cn.pkh", hex(alicePkh));
  return encodeCashAddress(prefix, addrType, alicePkh);
}
const addrs = [];
console.log({ mnemonic });
for (let i = 0; i < 1; i++) {
    const bchAddr = derive(derivationBase + i, addrType, prefix);
    console.log(bchAddr);
    addrs.push(bchAddr);
    writeFileSync("BCH.addr.txt", addrs.join("\n") + "\n");
}
// if(new Date().getTime()===0) {
//   const url = "http://localhost/";
//   const response = await fetch(url);
//   const body = await response.text();
//   writeFileSync('body.html', body);
// }
