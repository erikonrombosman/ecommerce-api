const {hola} = require("./classExample");

async function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function main(){
  // console.log("Antes de llamar");
  // const algo = await resolveAfter2Seconds();
  // console.log("Después de llamar")
  const newProduct = new Product(
    'coca cola', 1000, 950, false, '100100', 'coca cola'
  );
  newProduct.sayMyName('5');
  hola();
}

main();