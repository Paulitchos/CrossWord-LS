const meterPalavras = (arrayLetras,palavra) => {
    let linha;
    let coluna; 

    let misplace = 0;

    //console.log('ciclo for:');

    for (let indexPalavra = 0; indexPalavra < palavra.length; indexPalavra++) {

    //console.log (palavra[indexPalavra]);

        linha = Math.floor(Math.random() * arrayLetras.length);
        coluna = Math.floor(Math.random() * arrayLetras[0].length);

        //console.log('linha:' + linha + ' coluna:' + coluna);

        if (((coluna + palavra[indexPalavra].length) + 1) <= arrayLetras[0].length) {

            for (let checkcolunaF = 0; checkcolunaF < palavra[indexPalavra].length; checkcolunaF++) {
                
                if(arrayLetras[linha][coluna+checkcolunaF] !== "" && arrayLetras[linha][coluna+checkcolunaF] !== palavra[indexPalavra].charAt(checkcolunaF)){
                    misplace++;
                } 
            }
            
            if (misplace > 0){
                misplace = 0;
                break;
                
            } else{

                for (let colunaF = 0; colunaF < palavra[indexPalavra].length; colunaF++) {                
                    //console.log(palavra[indexPalavra]);
                    //arrayLetras[linha][coluna+colunaF] = <Letras key={`${linha}${coluna+colunaF}`} name={palavra[indexPalavra].charAt(colunaF)}/> ; 
                    arrayLetras[linha][coluna+colunaF] = {key: `${linha} ${coluna+colunaF}`, name: `${palavra[indexPalavra].charAt(colunaF)}`};
                    
                }
            }
        } 

    }

    
     

    return arrayLetras;
};

export default meterPalavras;
