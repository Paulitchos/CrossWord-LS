/*import { LETRAS_LOGOS } from "../constants/index";
import { shuffleArray } from "./index";
import { palavras } from "../constants/tabuleiros";
import { palavrasLengh } from "./index";
import Letras from "../components/letras/letras";

const meterPalavras = (arrayLetras,numOfLinhas, numOfColunas,numOfPalavras,handleDrag) => { 
  let linha;
  let coluna;
  let randomletters;
  let direcao;
  let xValor;
  let yValor;

  let misplace = 0;

   let randomPalavra = shuffleArray(palavras);
   let arrayPalavras = randomPalavra.slice(0, numOfPalavras);

   while (palavrasLengh(arrayPalavras, numOfLinhas) === false) {
     randomPalavra = shuffleArray(palavras);
     arrayPalavras = randomPalavra.slice(0, numOfPalavras);
   }

  //console.log('ciclo for:');

  for (let indexPalavra = 0; indexPalavra < arrayPalavras.length; indexPalavra++) {
    //console.log (palavra[indexPalavra]);
    
    while(true){
      console.log("Check1");
      linha = Math.floor(Math.random() * arrayLetras.length);
      coluna = Math.floor(Math.random() * arrayLetras[0].length);
      direcao = Math.floor(Math.random() * 7);

      switch (direcao) {
        default: // esquerda para direita
          xValor = 1;
          yValor = 0;
          break;
        case 1: // direita para esquerda
          xValor = -1;
          yValor = 0;
          break;
        case 2: // cima para baixo
          xValor = 0;
          yValor = 1;
          break;
        case 3: // baixo para cima
          xValor = 0;
          yValor = -1;
          break;
        case 4: // diagonal para baixo -> direita
          xValor = 1;
          yValor = 1;
          break;
        case 5: // diagonal para cima -> direita
          xValor = 1;
          yValor = -1;
          break;
        case 6: // diagobal para baixo -> esquerda
          xValor = -1;
          yValor = 1;
          break;
        case 7: // diagobal para cima -> esquerda
          xValor = -1;
          yValor = -1;
          break;
      }

      if  (linha + arrayPalavras[indexPalavra].length * yValor < 0 || linha + arrayPalavras[indexPalavra].length * yValor >= arrayLetras.length
      || coluna + arrayPalavras[indexPalavra].length* xValor < 0 || coluna + arrayPalavras[indexPalavra].length* xValor >= arrayLetras[0].length) 
        
        continue;

      misplace = 0;
      for (let index = 0;index < arrayPalavras[indexPalavra].length;index++){
        
        if(arrayLetras[linha + index * yValor][coluna + index * xValor] !== "" 
        &&  arrayLetras[linha + index * yValor][coluna + index * xValor] !== arrayPalavras[indexPalavra].charAt(index)){

          misplace = 1;
          break;

        }  
      }
        if (misplace === 0)
        break;
        
    }

    for (let putPalavra = 0;putPalavra < arrayPalavras[indexPalavra].length;putPalavra++) {
          arrayLetras[linha + putPalavra * yValor][
            coluna + putPalavra * xValor
          ] = (
            <Letras
              key={`${linha + putPalavra * yValor}${coluna + putPalavra * xValor}`}
              name={arrayPalavras[indexPalavra].charAt(putPalavra)}
            />
          );
    }
  }

  for (let i = 0; i < numOfLinhas; i++) {
    for (let j = 0; j < numOfColunas; j++){
        randomletters = shuffleArray(LETRAS_LOGOS);
        if (arrayLetras[i][j] === "") 
            arrayLetras[i][j] = 
              <Letras
                key={`${i} ${j}`}
                name={`${randomletters.slice(0, 1)}`}
              />
        ;
    }
  }
  return ([arrayLetras , arrayPalavras]);

};

export default meterPalavras;*/
