import {readFileSync} from 'fs';
function load() {
  const txt=readFileSync("./mnemonic.txt").toString().trim();
  const words = txt.split(/\s+/);
  const len=words.length;
  if(words.length % 3)
    throw new Error("mnemonic phrase length should be multiple of 3")
  return words.join(" ");    
}
export const mnemonic = load();
