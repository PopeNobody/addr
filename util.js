import {readFileSync} from "fs";

function readJson(name: string) {
    const buf = readFileSync(name);
    const str = buf.toString();
    const obj = JSON.parse(str);
    console.log(obj);
    return obj;
}
