/* eslint-disable @typescript-eslint/no-unused-vars */

import {Wallet} from "./wallet.js";



const list = [ "bch","btc" ];
const wallet = new Wallet(list);
list.forEach(sym=>{
    const chain = wallet.getAccount(sym);
    console.log(chain.getAddress(0));
});
