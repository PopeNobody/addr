const ci = require("coininfo");
const cs = require("coinstring");
const CoinKey = require("coinkey");

const coins = [ "btc", "bch", "dash", "doge" ];
coins.forEach(coin=>{
  var ck = new CoinKey(
    Buffer.from( '0000000000000000000000000000000000000000000000000000000000000001' , 'hex'),
    ci(coin));
  console.log(coin, ck.publicAddress) // => 16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS
});

