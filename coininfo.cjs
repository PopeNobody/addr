const fs = require('fs');
const readFileSync = fs.readFileSync;
const readdirSync = fs.readdirSync;

function readChainDir() {
  let dirents =readdirSync("chains", {withFileTypes: true});
  let dirs=JSON.stringify(dirents,null,2);
  console.log({dirs});
  if(dirents===null || dirents.length===0)
    throw new Error("Unable to read dir");
  console.log({dirs});
  return dirs;
}
const dirs = readChainDir();
console.log(dirs);

const coins = [
  {main: require('./chains/main/bch.json')},
  {main: require('./chains/main/btc.json')},
  {main: require('./chains/main/dash.json')},
  {main: require('./chains/main/doge.json')},
]
console.log(coins);

//  assert(util.isArrayish(privateKey), 'privateKey must be arrayish')
//  this._versions = util.normalizeVersions(versions) || util.clone(DEFAULT_VERSIONS)
//  // true => default compressed
//  ECKey.call(this, privateKey, true)
const coininfo = {}

coins.forEach(function (coin) {
  const unit = coin.main.unit.toLowerCase()
  coin.main.testnet = false
  coininfo[unit]=coin;
})

// coins.forEach(function (coin) {
//   console.log(coin.main.name.toLowerCase());
//   coininfo[coin.main.name.toLowerCase()] = coin
// })

// function toBitcoinJS () {
//   return Object.assign({}, this, {
//     messagePrefix: this.messagePrefix || ('\x19' + this.name + ' Signed Message:\n'),
//     bech32: this.bech32,
//     bip32: {
//       public: (this.versions.bip32 || {}).public,
//       private: (this.versions.bip32 || {}).private
//     },
//     pubKeyHash: this.versions.public,
//     scriptHash: this.versions.scripthash,
//     wif: this.versions.private,
//     dustThreshold: null // TODO
//   })
// }

// function toBitcore () {
//   // reverse magic
//   var nm = Buffer.allocUnsafe(4)
//   nm.writeUInt32BE(this.protocol ? this.protocol.magic : 0, 0)
//   nm = nm.readUInt32LE(0)

//   return Object.assign({}, this, {
//     name: this.testnet ? 'testnet' : 'livenet',
//     alias: this.testnet ? 'testnet' : 'mainnet',
//     pubkeyhash: this.versions.public,
//     privatekey: this.versions.private,
//     scripthash: this.versions.scripthash,
//     xpubkey: (this.versions.bip32 || {}).public,
//     xprivkey: (this.versions.bip32 || {}).private,
//     networkMagic: nm,
//     port: this.port,
//     dnsSeeds: this.seedsDns || []
//   })
// }

module.exports =  coininfo;
