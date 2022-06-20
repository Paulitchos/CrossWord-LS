import "./assets/styles/App.css";
import React from "react";
import { useState } from "react";
import { tabuleiroInicial } from "./helpers";
import { useEffect } from "react";
import { TIMEOUT } from "./constants/tabuleiros";
import { meterPalavras,arraydePalavras} from "./helpers";
import { palavras } from "./constants/tabuleiros";
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
  const [tamanhoBloco, setTamanhoBloco] = useState(0);
  const [numPalavras, setNumPalavras] = useState(0);
  const [palavrasDeJogo, setPalavrasDeJogo] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [scoreBoard, setScoreBoard] = useState([]);
  const [posOfClicks, setPosOfClicks] = useState([]);
  const [XYInicio, setXYInicio] = useState(undefined);
  const [XYFinal, setXYFinal] = useState(undefined);
  const [clicked, setClicked] = useState(new Array(blocos.length));
  const [completa, setCompleta] = useState(new Array(blocos.length));
  const [palavrasEncontradas, setPalavrasEncontradas] = useState([]);

  const updateScoreBoard = () => {
    setScoreBoard(JSON.parse(localStorage.getItem("scoreboard")));
  };

  const clearClicked = () => {
    setClicked(new Array(blocos.length));
  };

  const updatePoints = (operacaoSoma = true) => {
    let pointsSum = totalPoints;
    if (operacaoSoma) {
      pointsSum += timer * (palavrasDeJogo.length / 2);
    } else {
      pointsSum < 5 ? (pointsSum = 0) : (pointsSum -= 5);
    }
    setTotalPoints(pointsSum);
  };

  const handleGameStart = () => {
    setGameStarted(!gameStarted);
  };

  const handleOnSubmit = () => {

    let word = prompt("Introduza uma palavra");
    palavras.push(word.toUpperCase());
  }

  const handleOnClick = (event) => {
    const selectedIndex = event.target.dataset.key;

    

    let tmp = Array.from(posOfClicks);

    tmp.push(selectedIndex);

    setPosOfClicks(tmp);

    mudarCor(setClicked,tmp,0);
  };

  const mudarCor = (setter,indexS,letra1,letra2) => {
    let tmp;
    let index1 = parseInt(indexS[0]);
    let index2;
    if (indexS.length === 2) index2 = parseInt(indexS[1]);

    let XInicial = Math.floor(index1 / tamanhoBloco);
    let YInicial = Math.floor(index1 % tamanhoBloco);

    let XFinal = Math.floor(index2 / tamanhoBloco);
    let YFinal = Math.floor(index2 % tamanhoBloco);


    if (setter === setClicked){
      tmp = new Array(blocos.length);
      tmp[XInicial * tamanhoBloco + YInicial] = true;

      tmp[XFinal * tamanhoBloco + YFinal] = true;

      setter(tmp);
    } else {
        tmp = Array.from(completa);
        let YInicial = Math.floor(letra1 / tamanhoBloco);
        let XInicial = Math.floor(letra1 % tamanhoBloco);
        let YFinal = Math.floor(letra2 / tamanhoBloco);
        let XFinal = Math.floor(letra2 % tamanhoBloco);

        const tamanhoPalavra = Math.max(Math.abs(XInicial - XFinal), Math.abs(YInicial - YFinal)) + 1;

        let xOffset;
        let yOffset;

        if (YInicial > YFinal) yOffset = -1;
        else if (YInicial < YFinal) yOffset = 1;
        else yOffset = 0;

        if (XInicial > XFinal) xOffset = -1;
        else if (XInicial < XFinal) xOffset = 1;
        else xOffset = 0;

        for (let index = 0; index < tamanhoPalavra; index++) {
          let y = YInicial + index * yOffset;
          let x = XInicial + index * xOffset;

          let i = y * tamanhoBloco + x;

          tmp[i] = true;

        }
       setter(tmp);

    }
  
  };


  const processCoordenates = () => {

    const cordLetra1 = posOfClicks[0];
    const cordLetra2 = posOfClicks[1];
    let itsAWord = checkIfWord(cordLetra1, cordLetra2);
    
    if (itsAWord) {
      setTimeout(() => {
        setPosOfClicks([]);
        updatePoints(true);
      }, 500);
    } else {
      setTimeout(() => {
        setPosOfClicks([]);
        //setXYInicio(undefined);
        //updatePoints(false);
      }, 500);
    }
  };

  function checkIfWord(letra1, letra2) {

    let YInicial = Math.floor(letra1 / tamanhoBloco);
    let XInicial = Math.floor(letra1 % tamanhoBloco);
    let YFinal = Math.floor(letra2 / tamanhoBloco);
    let XFinal = Math.floor(letra2 % tamanhoBloco);

    const tamanhoPalavra = Math.max(Math.abs(XInicial - XFinal),Math.abs(YInicial - YFinal)) + 1;


    let xOffset;
    let yOffset;
    let palavra = "";
    let tmp;
    let tmpClicked = new Array(blocos.length);

    if (YInicial > YFinal) yOffset = -1;
    else if (YInicial < YFinal) yOffset = 1;
    else yOffset = 0;

    if (XInicial > XFinal) xOffset = -1;
    else if (XInicial < XFinal) xOffset = 1;
    else xOffset = 0;

    for (let index = 0; index < tamanhoPalavra; index++) {
      let y = YInicial + index * yOffset;
      let x = XInicial + index * xOffset;

      let i = y * tamanhoBloco + x;

      palavra += blocos[i].name;

      //console.log(i);
    }

 
    if (palavrasDeJogo.includes(palavra)) {
      if (!palavrasEncontradas.includes(palavra)) {
        tmp = Array.from(palavrasEncontradas);
        tmp.push(palavra);
        if (palavrasEncontradas.length === palavrasDeJogo.length - 1) {
          alert("Vitoria! Tiveste " + totalPoints + " pontos");
          handleGameStart();
        }
        setPalavrasEncontradas(tmp);
        mudarCor(setCompleta, tmpClicked, letra1, letra2);
        return true;
      }
      clearClicked();
      return false;
    }
      clearClicked();
      return false;
    
  }

   useEffect(() => {
     if (posOfClicks.length === 2) processCoordenates();
   }, [posOfClicks]);

  useEffect(() => {
    let palavrasJogo;
    let blocoInicial;
    let blocoDeJogo;

    blocoInicial = tabuleiroInicial(tamanhoBloco);
    palavrasJogo = arraydePalavras(tamanhoBloco, numPalavras);
    blocoDeJogo = meterPalavras(
      blocoInicial,
      tamanhoBloco,
      palavrasJogo
    );

    setTotalPoints(0);
    setPalavrasEncontradas([]);
    setBlocos(blocoDeJogo);
    setPalavrasDeJogo(palavrasJogo);
    setCompleta(new Array(blocos.length));
    setClicked(new Array(blocos.length));

    if (gameStarted) {
      let nextTimer;
      timerId = setInterval(() => {
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          return nextTimer;
        });

        if (nextTimer === 0) {
          alert("O seu tempo terminou.")
          setGameStarted(false);
        }
      }, 1000);
    } else if (timer !== 100) {

      setTimer(100);

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
        setTamanhoBloco(10);
        setNumPalavras(6);
        setTimer(200);
        break;
      // Level: Intermediate
      case "2":
        setTamanhoBloco(11);
        setNumPalavras(8);
        setTimer(150);
        break;
      // Level: Advanced
      case "3":
        setTamanhoBloco(12);
        setNumPalavras(10);
        setTimer(100);
        break;
      default:
        setTamanhoBloco(0);
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
          scoreBoard={totalPoints}
          handleOnSubmit={handleOnSubmit}
        />
        <Gamepanel
          letras={blocos}
          selectedLevel={selectedLevel}
          gameStarted={gameStarted}
          palavras={palavrasDeJogo}
          scoreBoard={scoreBoard}
          handleOnClick={handleOnClick}
          clicked={clicked}
          completa={completa}
          palavrasEncontradas={palavrasEncontradas}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
