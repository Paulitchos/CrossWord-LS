import React from "react";
import "./gamepanel.css";
import { Letras } from "../index";


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
        {letras.map((letra) => (
          <Letras key={letra.key} name={letra.name} />
        ))}
      </div>
    </section>
  );
}
export default GamePanel;