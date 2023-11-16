import {Chain} from "./chain.js";
import {Node} from "./node.js";
import {HdPrivateNodeValid} from "@bitauth/libauth";

export class Account {
    chain: Chain;
    root: HdPrivateNodeValid;
    nodes = new Array<Node>();
    constructor(root : HdPrivateNodeValid, sym: string) {
        this.root=root;
        this.chain=Chain.getChain(sym);
    }
    getDerivationPath() : string {
        return this.chain.derivationPath;
    }
    getNode(idx: number) : Node{
        if(!this.nodes[idx]){
            this.nodes[idx]=new Node(this,idx);
        }
        return this.nodes[idx];
    }
    getAddress(idx: number) : string {
        const node = this.getNode(idx);
        return node.address;
    }
}
