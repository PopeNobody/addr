// @ts-ignore
import { hash160 } from '@cashscript/utils';
import { deriveHdPath, deriveHdPrivateNodeFromSeed, encodeCashAddress, secp256k1, } from '@bitauth/libauth';
import { mnemonicToSeedSync} from 'bip39';
import { writeFileSync } from "fs";
import { mnemonic } from '../dst/mnemonic.js';

// Bitcoin Cash
const derivationBase = "m/44'/145'/0'/0/";
const prefix = 'bitcoincash';
const addrType = 'p2pkh';
import { hex,u8a } from './util.js';
const addrs = [];
const path = derivationBase + '0';
const seed = mnemonicToSeedSync(mnemonic);
const rootNode = deriveHdPrivateNodeFromSeed(seed, true);
const aliceNode = deriveHdPath(rootNode, path);
const privateKey = u8a(aliceNode.privateKey);
const alicePub = secp256k1.derivePublicKeyCompressed(privateKey);
const alicePkh = hash160(u8a(alicePub));
const bchAddr = encodeCashAddress(prefix, addrType, alicePkh);
console.log(bchAddr);
