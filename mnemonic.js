import fs from 'fs';

const text = fs.readFileSync("mnemonic.txt").toString();
const words = text.split(/\s+/);
export const mnemonic = words.join(" ");
