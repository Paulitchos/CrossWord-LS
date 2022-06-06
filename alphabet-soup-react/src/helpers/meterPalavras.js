
import { Letras } from "../components/index";

const meterPalavras = (letras,palavra) => {
    
    let linha = Math.floor(Math.random() * letras.length);
    let coluna = Math.floor(Math.random() * letras[0].length);

    for (let i = 0; i < palavra[0].length; i++) {
        letras[0][i] = <Letras key={`0${i}`} name={palavra[0].charAt(i)} /> ;
    }

    return letras;
};

export default meterPalavras;
