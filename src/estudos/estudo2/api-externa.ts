
// Declara a função "funcaoAPI" que recebe as variáveis "a" e "b" e uma função "funcaoCallback" como parâmetros
export function funcaoAPI(a: string, b: string, funcaoCallback: Function): string {
    console.log("api printando: " + a);
    console.log("api printando: " + b);
    
    // Executa a função que recebi como parâmetro e passa uma string da API
    funcaoCallback("API X");
  
    return a + b;
  }