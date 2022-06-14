import { LETRAS_LOGOS } from "../constants/index";
import { shuffleArray } from "./index";
import { palavras } from "../constants/tabuleiros";
import { palavrasLengh } from "./index";
import Letras from "../components/letras/letras";

const meterPalavras = (arrayLetras, numOfLinhas, numOfColunas,numOfPalavras) => {
  let linha;
  let coluna;
  let randomletters;

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

    linha = Math.floor(Math.random() * arrayLetras.length);
    coluna = Math.floor(Math.random() * arrayLetras[0].length);

    //console.log('linha:' + linha + ' coluna:' + coluna);

    if (coluna + arrayPalavras[indexPalavra].length + 1 <= arrayLetras[0].length) {
      for (
        let checkcolunaF = 0;
        checkcolunaF < arrayPalavras[indexPalavra].length;
        checkcolunaF++
      ) {
        if (
          arrayLetras[linha][coluna + checkcolunaF] !== "" &&
          arrayLetras[linha][coluna + checkcolunaF] !==
            arrayPalavras[indexPalavra].charAt(checkcolunaF)
        ) {
          misplace++;
        }
      }

      if (misplace > 0) {
        misplace = 0;
        break;
      } else {
        for (
          let colunaF = 0;
          colunaF < arrayPalavras[indexPalavra].length;
          colunaF++
        ) {
          //console.log(palavra[indexPalavra]);
          //arrayLetras[linha][coluna+colunaF] = <Letras key={`${linha}${coluna+colunaF}`} name={palavra[indexPalavra].charAt(colunaF)}/> ;
          arrayLetras[linha][coluna + colunaF] = 
            arrayLetras[linha][coluna+colunaF] = <Letras key={`${linha}${coluna+colunaF}`} name={arrayPalavras[indexPalavra].charAt(colunaF)}/>;
          
        }
      }
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
  return [arrayLetras , arrayPalavras];

};

export default meterPalavras;
