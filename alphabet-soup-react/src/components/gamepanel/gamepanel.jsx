import React from "react";
import "./gamepanel.css";


function GamePanel(props) {
  const { letras, selectedLevel } = props;
  let gameClasse = "";

  if (selectedLevel === "2") {
    gameClasse = "intermedio";
  } else if (selectedLevel === "3") {
    gameClasse = "avancado";
  } else {
    gameClasse = "";
  }

  console.log(letras)
  return (
    <section className="game-panel">
      <h3 className="sr-only">Letras do Jogo</h3>
      <div id="game" className={`${gameClasse}`}>
        {letras}
      </div>
    </section>
  );
}
export default GamePanel;