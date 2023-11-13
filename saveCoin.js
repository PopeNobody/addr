import {writeFileSync} from "fs";
global.saveCoin=saveCoin;
console.log({saveCoin});
function saveCoin(coin,net,obj) {
    const json = JSON.stringify(obj,null,2);
    writeFileSync(`./chains/${coin}.${net}.json`,json);
}
