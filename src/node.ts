import { Account  } from './account.js'
import {deriveHdPath, hash160, HdPrivateNodeValid, secp256k1} from "@bitauth/libauth";
import {u8a} from "./util.js";
export class Node {
    constructor(account : Account, idx : number)
    {
        this._idx=idx;
        this._account=account;
        this._node = this.deriveNode();
    }
    private readonly _idx: number;
    _account: Account;
    get account() {
        return this._account;
    }
    _node: HdPrivateNodeValid;
    get node() {
        return this._node;
    }
    _privateKey? : Uint8Array;
    get privateKey(): Uint8Array {
        return this._privateKey ||= this.node.privateKey;
    }
    _publicKey? : Uint8Array;
    get publicKey() : Uint8Array {
        if(!this._publicKey) {
            this._publicKey=
                u8a(secp256k1.derivePublicKeyCompressed(this.privateKey));
        }
        return this._publicKey;
    }
    get idx(): number {
        return this._idx;
    }
    get derivationPath(): string {
        const account = this.account;
        return account?.getDerivationPath()+"/"+this.idx;
    }
    private deriveNode() {
        return <HdPrivateNodeValid>deriveHdPath(
            this.account.root, this.derivationPath);
    }
    _publicKeyHash?: Uint8Array;
    get publicKeyHash() : Uint8Array{
        if(!this._publicKeyHash) {
            this._publicKeyHash||=hash160(u8a(this.publicKey));
        }
        return this._publicKeyHash;
    };
    _address?: string;
    get address() {
        return this._address||=
            this.account.chain.formatAddress(this.publicKeyHash);
    };
}
