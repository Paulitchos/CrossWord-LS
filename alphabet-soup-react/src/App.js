import "./assets/styles/App.css";
import React from "react";
import { useState } from "react";
import { LETRAS_LOGOS } from "./constants";
import { shuffleArray } from "./helpers/index.js";

import {
  Header,
  Footer,
  Gamepanel,
  ControlPanel,
} from "./components";


function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [letras, setLetras] = useState([]);

  const handleGameStart = () => {
    if (gameStarted) {
      console.log("Termina Jogo");
      setGameStarted(false);
    } else {
      console.log("Inicia Jogo");
      setGameStarted(true);
    }
  };

  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setSelectedLevel(value);

    let numOfColunas;
    let numOfLinhas;

    switch (value) {
      // Level: Beginner
      case "1":
        numOfColunas = 9;
        numOfLinhas = 11;
        break;
      // Level: Intermediate
      case "2":
        numOfColunas = 12;
        numOfLinhas = 12;
        break;
      // Level: Advanced
      case "3":
        numOfColunas = 12;
        numOfLinhas = 15;
        break;
      default:
        numOfColunas = 0;
        numOfLinhas = 0;
        break;
    }

    
    

    let index = 0;
    const arrayLetras = [];
    for (let colunas = 0; colunas < numOfColunas; colunas++) {
      for (let linhas = 0; linhas < numOfLinhas; linhas++){
        const initialLetras = shuffleArray(LETRAS_LOGOS);
        const slicedInitialLetras = initialLetras.slice(0, 1);
        arrayLetras.push({
          key: `${slicedInitialLetras}-${index}`,
          id: slicedInitialLetras,
          name: slicedInitialLetras,
        });
        index++;
      }
      index++;
    }
    
    setLetras([...arrayLetras]);
   };

   

  

  return (
    <div id="container" className="SoupaLetras">
      <Header />
      <main className="main-content">
        <ControlPanel
          gameStarted={gameStarted}
          onGameStart={handleGameStart}
          onLevelChange={handleLevelChange}
          selectedLevel={selectedLevel}
        />
        <Gamepanel letras = {letras} selectedLevel={selectedLevel}/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
