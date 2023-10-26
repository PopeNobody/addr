
function repeat(...args) {
  const res=[];
  while(args.length){
    let count=args.shift();
    let val=args.shift();
    while(count--){
      res.push(val);
    }
  }
  return res;
}
export const mnemonic=repeat(11,"abandon",1,"about");
