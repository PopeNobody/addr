import { readFileSync } from 'fs';
let mn = readFileSync("mnemonic.txt").toString();
mn = mn.trim();
const ar = mn.split(/\s+/);
if (mn.length % 3)
    throw new Error("mnemonic phrase length should be multiple of 3");
export const mnemonic = ar.join(" ");
