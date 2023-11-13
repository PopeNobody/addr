
const coins = [
  require('./chains/bch.cjs'),
  require('./chains/btc.cjs'),
  require('./chains/dash.cjs'),
  require('./chains/doge.cjs'),
]

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
