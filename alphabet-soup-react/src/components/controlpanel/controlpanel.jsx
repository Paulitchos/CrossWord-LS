import React from "react";
import "./controlpanel.css"



function ControlPanel(props) {

  const { gameStarted, selectedLevel, onGameStart, onLevelChange, timer } = props;
  const gameStartedClass = gameStarted ? " gameStarted" : "";
  
  return (
    <section id="panel-control">
      <h3 className="sr-only">Escolha do Nível</h3>
      <form className="form">
        <fieldset className="form-group">
          <label htmlFor="btLevel">Nível:</label>
          <select
            id="btLevel"
            defaultValue="0"
            onChange={onLevelChange}
            disabled={gameStarted}
          >
            <option defaultValue value="0">
              Seleccione...
            </option>
            <option value="1">Básico (11x9)</option>
            <option value="2">Intermédio (12x12)</option>
            <option value="3">Avançado (15x12)</option>
          </select>
        </fieldset>
        <button
          type="button"
          id="btPlay"
          disabled={selectedLevel === "0"}
          onClick={onGameStart}
        >
          {gameStarted ? "Parar jogo" : "Iniciar Jogo"}
        </button>
      </form>
      <div className="form-metadata">
        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Tempo de Jogo:</dt>
          <dd id="gameTime">{timer}</dd>
        </dl>
        <dl className={`list-item right${gameStartedClass}`}>
          <dt>Pontuação TOP:</dt>
          <dd id="pointsTop">0</dd>
        </dl>
        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Pontuação:</dt>
          <dd id="points">0</dd>
        </dl>
        <div id="top10" className={`right`}>
          <button id="btTop">Ver TOP 10</button>
        </div>
      </div>
    </section>
  );
}


export default ControlPanel;