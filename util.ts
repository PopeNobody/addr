import {readFileSync} from "fs";

console.log(u8a("test"));
export function u8a(maybeString : Uint8Array | string | Object ) {
    if (maybeString instanceof Uint8Array) {
        return maybeString;
    } else if (typeof (maybeString) === 'string') {
        const res = new Uint8Array(maybeString.length);
        new TextEncoder().encodeInto(maybeString, res);
        return res;
    } else {
        return u8a(maybeString.toString());
    }
}
console.log(readJson("chains/main/bch.json"));
export function readJson(name: string) {
    const buf = readFileSync(name);
    const str = buf.toString();
    const obj = JSON.parse(str);
    console.log(obj);
    return obj;
}
