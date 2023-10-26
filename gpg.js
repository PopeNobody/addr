#!env node
import { execFileSync, execFile } from 'child_process';
import { existsSync } from 'fs';
import util from 'util';

const pexecFile=util.promisify(execFile);

//async function encrypt(file, user, text) {
//  console.log(typeof({text}));
//  if(existsSync(text)){
//    execFileSync("mv", [ text, text+".bak" ]);
//  };
//  const env={};
//  Object.assign(env,process.env);
//  env.HOME=env.PWD;
//  return pexecFile("nohup", ["setsid", "gpg", 
//    "-ea", "-o", file, "-r", user, ], 
//    {
//    stdio: [ text, 'pipe', 'ignore' ],
//    env: [],
//    detached: true
//  }).then((obj)=>{
//    return obj.stdout;
//  }).catch(err=>{
//    const msg = err.stderr;
//    const code =  err.code
//    throw new Error( JSON.stringify({ msg, code }) )
//  });
//}
async function decrypt(file) {
  return pexecFile("nohup", [ "setsid", "gpg", "-d", file], {
    stdio: [ 'ignore', 'pipe', 'inherit' ],
    detached: true
  }).then((obj)=>{
    return obj.stdout;
  }).catch(err=>{
    const msg = err.stderr;
    const code =  err.code
    throw new Error( JSON.stringify({ msg, code }) );
  });
}

//let res = await decrypt("../../seed.asc");
//console.log(res);
//res=await encrypt("seed.asc","nobody",res);
//console.log(await decrypt("seed.asc"))
