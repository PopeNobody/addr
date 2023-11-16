import {deriveHdPrivateNodeFromSeed, HdPrivateNodeValid} from "@bitauth/libauth";
import {mnemonicToSeedSync} from "bip39";
import {mnemonic} from "./mnemonic.js";
import {Account} from './account.js';

export class Wallet {
  readonly seed: Buffer;
  readonly node:  HdPrivateNodeValid;
  accounts = new Map<string, Account>();
  constructor(syms: string[]) {
    this.seed = mnemonicToSeedSync(mnemonic);
    const node = deriveHdPrivateNodeFromSeed(this.seed);
    this.node = <HdPrivateNodeValid>node;
    for(let i=0;i<syms.length;i++) {
      const sym = syms[i];
      const account = new Account(this.node,sym);
      this.accounts.set(sym,account);
    }
  }
  getSymbols() : string[] {
    return [ ... this.accounts.keys() ];
  }
  getAccount(bch: string) : Account {
    const account = this.accounts.get(bch);
    if(account==null)
      throw new Error("account not found");
    return account;
  }
  showAddrs() {
    const syms: string[] = this.getSymbols();
    for(const sym of syms ) {
      const account: Account = this.getAccount(sym);
      const address: string = account.getAddress(0);
    }
  }
}
