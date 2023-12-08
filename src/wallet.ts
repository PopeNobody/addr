import {HdPrivateNodeValid} from "@bitauth/libauth";
import {Account} from './account.js';
import { Mnemonic } from './mnemonic.js';

export class Wallet {
  readonly node:  HdPrivateNodeValid;
  readonly accounts =new Map<string,Account>();

  constructor(mnemonic: Mnemonic) {
    this.node = mnemonic.node;
  }
  getSymbols() : string[] {
    return Object.keys(this.accounts);
  }
  getAccount(sym: string) : Account {
    const account = this.accounts.get(sym);
    if(account==null)
      throw new Error("account not found");
    return account;
  }
  showAddrs() {
    const syms: string[] = this.getSymbols();
    for(const sym of syms ) {
      const account: Account = this.getAccount(sym);
      const address: string = account.getAddress(0);
      console.log({address});
    }
  }
}
