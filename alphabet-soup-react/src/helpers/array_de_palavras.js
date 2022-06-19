import { palavras } from "../constants/tabuleiros";
import { shuffleArray } from "./index";

const arraydePalavras = (maxLength,numOfPalavras) => {

  let randomPalavra;
  let arrayPalavras = [];

  randomPalavra = shuffleArray(palavras);
  
  for (let i = 0; i < randomPalavra.length; i++) {
    
    if (randomPalavra[i].length <= maxLength) {
        arrayPalavras.push(randomPalavra[i]);
    }

    if(arrayPalavras.length === numOfPalavras)
      break;
  }
  
  return arrayPalavras; 
};

 

export default arraydePalavras;
