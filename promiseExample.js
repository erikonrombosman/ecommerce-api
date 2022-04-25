function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

function main(){
  console.log("Antes de llamar");
  resolveAfter2Seconds()
    .then(() => {
      // código que espera
      console.log("Después de llamar");
    })
  // Código que no espera
  console.log("No espera respuesta")

}

main();