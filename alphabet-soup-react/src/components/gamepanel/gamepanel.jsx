import React from "react";
import "./gamepanel.css";
import { Letras } from "../index";


function GamePanel() {
  return (
    <section className="game-panel">
      <h3 className="sr-only">Letras do Jogo</h3>
      <div id="game">
        <Letras name="A"></Letras>
        <Letras name="A"></Letras>
        <Letras name="A"></Letras>
        <Letras name="a"></Letras>
        <Letras name="A"></Letras>
        <Letras name="A"></Letras>
        <Letras name="A"></Letras>
        <Letras name="A"></Letras>
        <Letras name="A"></Letras>
        <Letras name="A"></Letras>
        <Letras name="A"></Letras>
        <Letras name="A"></Letras>
        <Letras name="A"></Letras>
        <Letras name="A"></Letras>
        <Letras name="A"></Letras>
      </div>
    </section>
  );
}
export default GamePanel;