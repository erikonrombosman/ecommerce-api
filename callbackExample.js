function resolveAfter2Seconds(callback) {
  return new Promise(() => {
      setTimeout(() => {
        callback('resolved');
      }, 2000);
    });
}
  
  function main(){
    console.log("Antes de llamar");
    const hola = function(response){
      console.log('Espera la respuesta', response);
    }
    resolveAfter2Seconds(hola);
    // Código que no espera
    console.log("No espera respuesta")

  }
  
  main();