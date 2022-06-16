import "./assets/styles/App.css";
import React from "react";
import { useState } from "react";
import { tabuleiroInicial } from "./helpers";
import { useEffect } from "react";
import { TIMEOUT } from "./constants/tabuleiros";
import { meterPalavras,arraydePalavras } from "./helpers";


import {
  Header,
  Footer,
  Gamepanel,
  ControlPanel,
} from "./components";

let timerId = undefined;

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [blocos, setBlocos] = useState([]);
  const [timer, setTimer] = useState(0);
  const [numLinhas, setNumLinhas] = useState(0);
  const [numColunas, setNumColunas] = useState(0);
  const [numPalavras, setNumPalavras] = useState(0);
  const [palavrasDeJogo, setPalavrasDeJogo] = useState([]);

 const handleGameStart = () => {
   setGameStarted(!gameStarted);
 };

  

   useEffect(() => {
    
    let palavrasJogo;
    let blocoInicial;
    let blocoDeJogo;

    blocoInicial = tabuleiroInicial(numLinhas, numColunas);
    console.log(blocoInicial);
    palavrasJogo = arraydePalavras(numLinhas,numPalavras);
    blocoDeJogo = meterPalavras(blocoInicial, numLinhas, numColunas, palavrasJogo);
    
    setBlocos(blocoDeJogo);
    setPalavrasDeJogo(palavrasJogo);

    if (gameStarted) {
      let nextTimer;
      timerId = setInterval(() => {
        
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          return nextTimer;
        });

        if (nextTimer === 0) {
          setGameStarted(false);

        }
      }, 1000);
    } else if (timer !== 100) {
      setTimer(TIMEOUT);
    }
    
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted]);

  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setSelectedLevel(value);

    switch (value) {
      // Level: Beginner
      case "1":
        setNumColunas(9);
        setNumLinhas(11);
        setNumPalavras(6);
        setTimer(10);
        break;
      // Level: Intermediate
      case "2":
        setNumColunas(12);
        setNumLinhas(12);
        setNumPalavras(8);
        setTimer(200);
        break;
      // Level: Advanced
      case "3":
        setNumColunas(12);
        setNumLinhas(15);
        setNumPalavras(10);
        setTimer(220);
        break;
      default:
        setNumColunas(0);
        setNumLinhas(0);
        setNumPalavras(0);
        break;
    }
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
          timer={timer}
        />
        <Gamepanel letras={blocos}
        selectedLevel={selectedLevel} 
        gameStarted={gameStarted}
        palavras={palavrasDeJogo}/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
