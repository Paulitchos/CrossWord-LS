
const tabuleiroInicial = (numOfLinhas, numOfColunas) => {
  
  let arrayLetras = new Array(numOfColunas);

  for (let linha = 0; linha < numOfLinhas; linha++) {
    arrayLetras[linha] = new Array(numOfColunas);
    for (let coluna = 0; coluna < numOfColunas; coluna++)
      arrayLetras[linha][coluna] = "";
  }

  return (arrayLetras);
};

export default tabuleiroInicial;
