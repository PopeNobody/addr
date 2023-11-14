console.log("test");
// import './saveCoin.js';
// import { mnemonic } from './mnemonic.js';
// import { mnemonicToSeed } from 'bip39';
// import {encodeCashAddress, secp256k1} from '@bitauth/libauth';
// import {chains} from "./chains.js";
// import {HDRoot} from "./hdroot.js";
// import {hash160} from "@cashscript/utils";
// import {CashAddressNetworkPrefix} from "@bitauth/libauth";
// 
// 
// async function run() {
//     const seed = await mnemonicToSeed(mnemonic);
//     const root = new HDRoot(seed);
// 
//     const btc = chains.get("btc");
//     const prv = root.getPrivateKey(btc,0);
//     const pub =
//         secp256k1.derivePublicKeyCompressed(prv);
//     const pkh = hash160(pub);
//     const addrType = 'p2pkh';
//     const prefix= CashAddressNetworkPrefix.mainnet;
//     const addr = encodeCashAddress(prefix, addrType, pkh);
//     console.log({addr});
//     console.log({addr});
//     return "done";
// }
// run().then(console.log).catch(console.error);
