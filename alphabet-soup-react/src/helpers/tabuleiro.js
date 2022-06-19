
const tabuleiroInicial = (tamanhoBloco) => {
  let arrayLetras = new Array(tamanhoBloco);

  for (let linha = 0; linha < tamanhoBloco; linha++) {
    arrayLetras[linha] = new Array(tamanhoBloco);
    for (let coluna = 0; coluna < tamanhoBloco; coluna++)
      arrayLetras[linha][coluna] = "*";
  }

  return arrayLetras;
};

export default tabuleiroInicial;
