import "./assets/styles/App.css";
import React from "react";
import { useState } from "react";
import { tabuleiroInicial } from "./helpers";
import { useEffect } from "react";
import { meterPalavras } from "./helpers";



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

 // const [palavras , setPalavras] = useState(["Ola","Adeus","Isec","Coimbra"]);

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

    switch (value) {
      // Level: Beginner
      case "1":
        setBlocos([]);
        setPalavrasDeJogo([]);
        setNumColunas(9);
        setNumLinhas(11);
        setNumPalavras(6);
        setTimer(10);
        break;
      // Level: Intermediate
      case "2":
        setBlocos([]);
        setPalavrasDeJogo([]);
        setNumColunas(12);
        setNumLinhas(12);
        setNumPalavras(8);
        setTimer(200);
        break;
      // Level: Advanced
      case "3":
        setBlocos([]);
        setPalavrasDeJogo([]);
        setNumColunas(12);
        setNumLinhas(15);
        setNumPalavras(10);
        setTimer(220);
        break;
      default:
        setNumColunas(0);
        setNumLinhas(0);
        setNumPalavras(0);

        setBlocos([]);
        setPalavrasDeJogo([]);
        break;
    }
  
   };

   useEffect(() => {
    let nextTimer;
    let palavrasJogo;
    let blocoInicial;
    let blocoDeJogo;

    blocoInicial = tabuleiroInicial(numLinhas, numColunas);
    [blocoDeJogo,palavrasJogo] = meterPalavras(blocoInicial, numLinhas, numColunas, numPalavras);
    
    setBlocos(blocoDeJogo);
    setPalavrasDeJogo(palavrasJogo);

    if (gameStarted) {
      timerId = setInterval(() => {
        
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          return nextTimer;
        });

        if (nextTimer === 0) {
          setGameStarted(false);

        }
      }, 1000);
    } else if (timer !== 0) {
      setTimer(0);
    }
    
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted]);

   
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
