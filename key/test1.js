var CoinKey = require('coinkey')

const buf = Buffer.alloc(32,0x0e);
buf[31]=1;
function hex(buf) {
  return buf.toString('hex');
};
console.log(hex(buf));

const ck = CoinKey(buf);
console.log(ck);
ck.privateKey;
ck.publicKey;
console.log(ck.publicAddress);
console.log(ck);
//
