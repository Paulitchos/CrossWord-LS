
import { Letras } from "../components/index";

const meterPalavras = (letras,palavra) => {
    let linha;
    let coluna; 

    let misplace = 0;

    for (let indexPalavra = 0; indexPalavra < palavra.length; indexPalavra++) {
        linha = Math.floor(Math.random() * letras.length);
        coluna = Math.floor(Math.random() * letras[0].length);
        
        if (((coluna + palavra[indexPalavra].length) + 1) <= letras[0].length) {

            for (let checkcolunaF = 0; checkcolunaF < palavra[indexPalavra].length; checkcolunaF++) {
                
                if(letras[linha][coluna+checkcolunaF] !== "" && letras[linha][coluna+checkcolunaF] !== palavra[indexPalavra].charAt(checkcolunaF)){
                    misplace++;
                } 
            }
            
            if (misplace > 0){
                misplace = 0;
                break;
            } else{
                
                for (let colunaF = 0; colunaF < palavra[indexPalavra].length; colunaF++) {
                
                    letras[linha][coluna+colunaF] = <Letras key={`${linha}${coluna+colunaF}`} name={palavra[indexPalavra].charAt(colunaF)}/> ; 
                }

            }
        } 

    }

    
     

    return letras;
};

export default meterPalavras;
