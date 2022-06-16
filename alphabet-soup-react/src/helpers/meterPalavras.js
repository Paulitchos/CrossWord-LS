import { LETRAS_LOGOS } from "../constants/index";
import { shuffleArray } from "./index";
import Letras from "../components/letras/letras";
const meterPalavras = (arrayLetras,numOfLinhas, numOfColunas,arrayPalavras) => {
  let linha;
  let coluna;
  let randomletters;
  let direcao;
  let xValor;
  let yValor;
  let missplace = 0;
  let linhas =[];
  let colunas = [];
  let xValores = [];
  let yValores = [];
  let tamanhoPalavra;

  while(true){
    missplace = 0;
    linhas = [];
    colunas = [];
    xValores = [];
    yValores = [];

    console.log(arrayPalavras);

    for (let indexPalavra = 0;indexPalavra < arrayPalavras.length; indexPalavra++){
      linha = Math.round(Math.random() * (numOfLinhas - 1));
      coluna = Math.round(Math.random() * (numOfColunas - 1));
      direcao = Math.round(Math.random() * 7);
      tamanhoPalavra = arrayPalavras[indexPalavra].length;
      console.log(linha);
      console.log(coluna);
      console.log(direcao);

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

      if (coluna + ((tamanhoPalavra - 1) * xValor) < 0 || numOfColunas <= coluna + ((tamanhoPalavra - 1) * xValor) 
          ||linha + ((tamanhoPalavra - 1) * yValor) < 0 || numOfLinhas <= linha + ((tamanhoPalavra - 1) * yValor)) {
          indexPalavra--;
          continue;
      }

      for (let index = 0; index < arrayPalavras[indexPalavra].length; index++) {
        
        if(arrayLetras[linha + (index * yValor)][coluna + (index * xValor)] !== ""
           && arrayLetras[linha + (index * yValor)][coluna + (index * xValor)] !== arrayPalavras[indexPalavra].charAt(index)){

            missplace = 1;
            break;
        }
        
      }

      if (missplace === 1)
        break;
      linhas.push(linha);
      colunas.push(coluna);
      xValores.push(xValor);
      yValores.push(yValor);
    }
    if (missplace === 0)

      break;
  }
  console.log("Saí");
  

  console.log("Check6");

  for (let indexPalavra = 0; indexPalavra < arrayPalavras.length; indexPalavra++) {
   let linha_index = linhas[indexPalavra];
   let coluna_index = colunas[indexPalavra];
   let xValor_index = xValores[indexPalavra];
   let yValor_index = yValores[indexPalavra];

    for (let letraIndex = 0;letraIndex < arrayPalavras[indexPalavra].length;letraIndex++) {
          arrayLetras[linha_index  + letraIndex * yValor_index ][coluna_index  + letraIndex * xValor_index ] = (
            <Letras
              key={`${linha_index  + letraIndex * yValor_index }${
                coluna_index  + letraIndex * xValor_index 
              }`}
              name={arrayPalavras[indexPalavra].charAt(letraIndex)}
            />
          );
    }
  }

  for (let i = 0; i < numOfLinhas; i++) {
    for (let j = 0; j < numOfColunas; j++) {
      randomletters = shuffleArray(LETRAS_LOGOS);
      if (arrayLetras[i][j] === "")
        arrayLetras[i][j] = (
          <Letras key={`${i} ${j}`} name={`${randomletters.slice(0, 1)}`} />
        );
    }
  }

  return (arrayLetras.flat());

};

export default meterPalavras;
