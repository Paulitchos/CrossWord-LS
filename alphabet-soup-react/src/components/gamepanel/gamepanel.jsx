import React from "react";
import "./gamepanel.css";
import { meterPalavras } from "../../helpers/index";


function GamePanel(props) {
  const { letras, selectedLevel, palavras } = props;
  let gameClasse = "";
  let tabuleiroJogo = [];

  if (selectedLevel === "2") {
    gameClasse = "intermedio";
  } else if (selectedLevel === "3") {
    gameClasse = "avancado";
  } else {
    gameClasse = "";
  }

  if (selectedLevel !== "0"){
   
    tabuleiroJogo = meterPalavras(letras,palavras);
    
  }

  console.log(letras);
  console.log(palavras);

  return (
    <section className="game-panel">
      <h3 className="sr-only">Letras do Jogo</h3>
      <div id="game" className={`${gameClasse}`}>
        {tabuleiroJogo}
      </div>
    </section>
  );
}
export default GamePanel;