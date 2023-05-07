
export async function funcaoAPI(a: string, b: string): Promise<string> {

  // Aguarda por 1 segundo (1000 milissegundos) antes de executar a próxima linha de código
  //corrigir
  await setTimeout(function() {
  }, 5000);
  
  console.log("api printando: " + a);
  console.log("api printando: " + b);
  return a + b;
}

