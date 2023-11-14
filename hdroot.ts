console.log("test");

// import {deriveHdPath, deriveHdPrivateNodeFromSeed} from "@bitauth/libauth";
// 
// export class HDRoot {
//     root;
//     seed: Buffer;
//     acct;
//     constructor(seed) {
//         this.acct = {};
//         this.seed = seed;
//         this.root = deriveHdPrivateNodeFromSeed(this.seed);
//     }
//     getNode(chain, idx) {
//         const sym = chain.sym;
//         const path = chain.derivationPath+idx;
//         const root = this.root;
//         return deriveHdPath(root,path);
//     }
//     getPrivateKey(chain, idx) {
//         const node=this.getNode(chain,idx);
//         const pk = node.privateKey;
//         console.log({node,pk});
//         return pk;
//     }
// }
