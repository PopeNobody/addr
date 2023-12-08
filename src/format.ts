import {
    binToBase58,
    CashAddressNetworkPrefix,
    CashAddressType,
    encodeCashAddress,
    hash256
} from "@bitauth/libauth";
import {hex} from "./util.js";

export interface AddressFormat {
    format(address: Uint8Array) : string;
}
class BitcoinFormat implements AddressFormat {
    format(publicKeyHash: Uint8Array) : string {
        const len = publicKeyHash.length;
        const arr = new Uint8Array(len+5);
        console.log(hex(arr));
        arr.set(publicKeyHash, 1);
        console.log(hex(arr));
        const checksum = hash256(arr).subarray(0,4);
        arr.set(checksum,len+1);
        return binToBase58(arr);
    }
}
class BitcoinCashFormat implements AddressFormat {
    format(publicKeyHash: Uint8Array) {
        console.log(publicKeyHash.length);
        const type = CashAddressType.p2pkh;
        const prefix: CashAddressNetworkPrefix
            = CashAddressNetworkPrefix.mainnet;
        return encodeCashAddress(prefix,type ,publicKeyHash);
    }
}
export function getFormats(sym: string) {
  const res : Map<string,AddressFormat> =
      new Map<string,AddressFormat>;
  if(sym==="bch") {
      res.set("legacy", new BitcoinFormat());
      res.set("cashaddr", new BitcoinCashFormat());
  } else if (sym == "btc" ) {
      res.set("legacy", new BitcoinFormat())
  } else {
      res.set("standard", new BitcoinFormat())
  }
  return res;
}
