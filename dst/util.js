import { Buffer } from 'buffer';
import { readFileSync } from "fs";
export function readJson(path) {
    const text = readFileSync(path).toString();
    return JSON.parse(text);
}
export function displayBuf(data) {
    return data.toString('hex');
}
export function displayU8A(data) {
    const buf = Buffer.from(data);
    return displayBuf(buf);
}
export function hex(data) {
    if (Buffer.isBuffer(data)) {
        return displayBuf(data);
    }
    else if (data instanceof Uint8Array) {
        return displayU8A(data);
    }
    else {
        return data;
    }
}
export function u8a(maybeString) {
    if (maybeString instanceof Uint8Array)
        return maybeString;
    const res = new Uint8Array(maybeString.length);
    new TextEncoder().encodeInto(maybeString, res);
    return res;
}
export function now() {
    return new Date().getTime();
}
export function getType(obj) {
    const type = typeof (obj);
    if (type === 'object') {
        const prot = Object.getPrototypeOf(obj);
        return prot.constructor;
    }
    else {
        return type;
    }
}
//# sourceMappingURL=util.js.map