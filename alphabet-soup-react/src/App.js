import "./assets/styles/App.css";
import React from "react";
import { useState } from "react";

import {
  Header,
  Footer,
  Gamepanel,
  ControlPanel,
} from "./components";


function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");

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
     console.log(setSelectedLevel);
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
        <Gamepanel />
      </main>
      <Footer />
    </div>
  );
}

export default App;
