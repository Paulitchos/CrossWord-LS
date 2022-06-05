import { Letras } from "../components/index";

const tabuleiro = (numOfLinhas, numOfColunas) => {
  const arrayLetras = [];
  for (let linhas = 0; linhas < numOfLinhas; linhas++) {
    arrayLetras.push([]);
    for (let colunas = 0; colunas < numOfColunas; colunas++) {
      arrayLetras[linhas].push(
        <Letras key={`${linhas}${colunas}`} name="vazio" />
      );
    }
  }

  return [...arrayLetras];
};

export default tabuleiro;
