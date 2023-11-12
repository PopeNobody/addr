
node -e '
async function gimmeAnA() {
  eturn "A";
}
console.log(gimmeAnA());
console.log(gimmeAnA().then(a=>{return a}));
console.log(gimmeAnA().then(a=>a));
'


console.log(
  gimmeAnA();
);
