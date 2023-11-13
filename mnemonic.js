import fs from 'fs';

let mn = fs.readFileSync("mnemonic.txt").toString();
mn=mn.trim();
mn=mn.split(/\s+/);
if(mn.length % 3)
    throw new Error("mnemonic phrase length should be multiple of 3")
export const mnemonic = mn.join(" ");
