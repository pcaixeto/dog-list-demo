// Importa a função "funcaoAPI" do arquivo "api-externa.ts"
import { funcaoAPI } from "./api-externa";

// Declara duas variáveis "a" e "b" do tipo "string"
const a: string = "A";
const b: string = "B";

// Declara uma função chamada "funcaoCallback" agora com parametro

// Exibe uma mensagem na tela
console.log("meu codigo fazendo algo1");
console.log("meu codigo fazendo algo2");

// Chama a função "funcaoAPI" passando as variáveis "a" e "b" e a função "funcaoCallback" como parâmetros
funcaoAPI(a, b, (x: string) => {
  console.log(`meu codigo do callback sendo executado usando o parametro da api: ${x}`);  
});

// Exibe uma mensagem na tela
console.log("meu codigo fazendo algo3");
console.log("meu codigo fazendo algo4");