import {binToBase58, CashAddressNetworkPrefix, CashAddressType, encodeCashAddress, hash256} from "@bitauth/libauth";

interface AddressFormat {
    format(address: Uint8Array) : string;
}
class BitcoinFormat implements AddressFormat {
    prefix= 0x00;
    format(publicKeyHash: Uint8Array) : string {
        const len = publicKeyHash.length;
        const arr = new Uint8Array(len+5);
        arr.set(publicKeyHash, 1);
        const checksum = hash256(arr).subarray(0,4);
        arr.set(checksum,len+1);
        return binToBase58(arr);
    }
}
class BitcoinCashFormat implements AddressFormat {
    type = CashAddressType.p2pkh;
    format(publicKeyHash: Uint8Array) {
        console.log(publicKeyHash.length);
        const prefix: CashAddressNetworkPrefix = CashAddressNetworkPrefix.mainnet;
        return encodeCashAddress(prefix,this.type ,publicKeyHash);
    }
}

