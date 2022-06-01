import "./assets/styles/App.css";
import React from "react";
import { useState } from "react";
import { LETRAS_LOGOS } from "./constants";

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

    let numOfLetras;
    const initialLetras = LETRAS_LOGOS;

    switch (value) {
      // Level: Beginner
      case "1":
          numOfLetras = 9 * 11;
          for (let index = 0; index < 4; index++) {
            initialLetras.push(...LETRAS_LOGOS);
          }
          break;
      // Level: Intermediate
      case "2":
          numOfLetras = 12 * 12;
          break;
      // Level: Advanced
      case "3":
          numOfLetras = 12 * 17;
          break;
      default:
          numOfLetras = 0;
          break;
    }

    

    
    const slicedInitialLetras = initialLetras.slice(0, numOfLetras);
    
    const arrayLetras = [];
    
    slicedInitialLetras.forEach((letra, index) => {
      arrayLetras.push({
        key: `${letra}-${index}`,
        id: letra,
        name: letra,
      });
    });

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
