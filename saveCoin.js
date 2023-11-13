import {writeFileSync} from "fs";
global.saveCoin=saveCoin;
console.log({saveCoin});
function saveCoin(coin,net,obj) {
    const json = JSON.stringify(obj,null,2);
    if(net==="main") {
        net="";
    } else {
        net=net+"/";
    }
    const file = `./chains/${net}${coin}.json`;
    console.log({coin,net,file});
    writeFileSync(file,json);
}
