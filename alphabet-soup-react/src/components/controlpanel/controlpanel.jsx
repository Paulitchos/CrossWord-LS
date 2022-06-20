import React from "react";
import "./controlpanel.css"



function ControlPanel(props) {

  const { gameStarted, selectedLevel, onGameStart, onLevelChange, timer, scoreBoard, handleOnSubmit } = props;
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
            <option value="1">Básico (10x10)</option>
            <option value="2">Intermédio (11x11)</option>
            <option value="3">Avançado (12x12)</option>
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
        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Pontuação:</dt>
          <dd id="points">{scoreBoard}</dd>
        </dl>
        <div id="top10" className={`right`}>
          <button id="btTop" onClick={handleOnSubmit} disabled={gameStarted}>
            Submeter
          </button>
        </div>
      </div>
    </section>
  );
}


export default ControlPanel;