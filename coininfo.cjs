const Buffer = require('safe-buffer').Buffer;

const coins = [
  require('./coins/bch'),
  require('./coins/blk'),
  require('./coins/btc'),
  require('./coins/btg'),
  require('./coins/cbn'),
  require('./coins/city'),
  require('./coins/dash'),
  require('./coins/dnr'),
  require('./coins/dcr'),
  require('./coins/dgb'),
  require('./coins/doge'),
  require('./coins/grs'),
  require('./coins/ltc'),
  require('./coins/via'),
  require('./coins/mona'),
  require('./coins/nbt'),
  require('./coins/nmc'),
  require('./coins/ppc'),
  require('./coins/qtum'),
  require('./coins/rvn'),
  require('./coins/rdd'),
  require('./coins/vtc'),
  require('./coins/x42'),
  require('./coins/zec')
]

var supportedCoins = {}

coins.forEach(function (coin) {
  const unit = coin.main.unit.toLowerCase()
  const name = coin.main.name.toLowerCase()
  coin.main.testnet = false
  supportedCoins[unit] = coin.main
  supportedCoins[name] = coin.main
})

function coininfo (input) {
  const coin = input.toLowerCase()

  if (!(coin in supportedCoins)) {
    return null
  } else {
    return supportedCoins[coin]
  }
}

coins.forEach(function (coin) {
  coininfo[coin.main.name.toLowerCase()] = coin
})

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

module.exports = coininfo
