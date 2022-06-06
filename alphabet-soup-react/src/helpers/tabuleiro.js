

const tabuleiroInicial = (numOfLinhas, numOfColunas) => {
  const arrayLetras = [];
  for (let linhas = 0; linhas < numOfLinhas; linhas++) {
    arrayLetras.push([]);
    for (let colunas = 0; colunas < numOfColunas; colunas++) {
      arrayLetras[linhas].push("");
    }
  }

  return [...arrayLetras];
};

export default tabuleiroInicial;
