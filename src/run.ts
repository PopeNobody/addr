/* eslint-disable @typescript-eslint/no-unused-vars */

import { Wallet } from "./wallet.js";
import { mnemonic } from "./mnemonic.js";

const wallet = new Wallet(mnemonic);
const list = wallet.getSymbols();

list.forEach(sym=>{
    const chain = wallet.getAccount(sym);
    console.log(chain.getAddress(0));
});
