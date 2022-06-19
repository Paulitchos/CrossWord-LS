import "./assets/styles/App.css";
import React from "react";
import { useState } from "react";
import { tabuleiroInicial } from "./helpers";
import { useEffect } from "react";
import { TIMEOUT } from "./constants/tabuleiros";
import { meterPalavras,arraydePalavras} from "./helpers";

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
  const [totalPoints, setTotalPoints] = useState(0);
  const [scoreBoard, setScoreBoard] = useState([]);
  const [posOfClicks, setPosOfClicks] = useState([]);
  const [XYInicio, setXYInicio] = useState(undefined);
  const [XYFinal, setXYFinal] = useState(undefined);
  const [clicked, setClicked] = useState([]);
  const [palavrasEncontradas, setPalavrasEncontradas] = useState([]);

  const updateScoreBoard = () => {
    setScoreBoard(JSON.parse(localStorage.getItem("scoreboard")));
  };
  const updatePoints = (operacaoSoma = true) => {
    let pointsSum = totalPoints;
    if (operacaoSoma) {
      pointsSum += timer * (palavrasDeJogo.le111ngth / 2);
    } else {
      pointsSum < 5 ? (pointsSum = 0) : (pointsSum -= 5);
    }
    setTotalPoints(pointsSum);
  };

  const handleGameStart = () => {
    setGameStarted(!gameStarted);
  };

  const handleOnClick = (event) => {
    console.log(posOfClicks.length);
    const selectedIndex = event.target.dataset.key;

    let tmp = Array.from(posOfClicks);

    tmp.push(selectedIndex);

    setPosOfClicks(tmp);
  };

  const processCoordenates = () => {
    console.log("Entrou");
    setXYInicio(posOfClicks[0]);
    setXYFinal(posOfClicks[1]);

    console.log(posOfClicks[0]);
    const letra2Cord = XYFinal;
    /*let itsAWord = checkIfWord(letra1Cord, letra2Cord);
    if (itsAWord) {
      console.log("Entrou");
      setTimeout(() => {
        setPalavrasEncontradas((previousState) => [
          ...previousState,
          ...posOfClicks,
        ]);
        setPosOfClicks([]);
        //setXYInicio(undefined);
        //updatePoints(true);
      }, 500);
    } else {
      setTimeout(() => {
        setPosOfClicks([]);
        //setXYInicio(undefined);
        //updatePoints(false);
      }, 500);
    }*/
  };

  function checkIfWord(letra1, letra2) {
    let XInicial = letra1[0];
    let YInicial = letra1[2];
    let XFinal = letra2[0];
    let YFinal = letra2[2];
    let xOffset;
    let yOffset;
    let palavra = "";
    let tmp;
    let x;
    let y;

    if (YInicial > YFinal) xOffset = -1;
    else if (YInicial < YFinal) xOffset = 1;
    else xOffset = 0;

    if (XInicial > XFinal) yOffset = -1;
    else if (XInicial < XFinal) yOffset = 1;
    else yOffset = 0;

    x = XInicial;
    y = YInicial;

    while (true) {
      palavra += blocos[y * 11 + x];
      x += yOffset;
      y += xOffset;
      if (x === YFinal + yOffset && y === XFinal + yOffset) break;
    }

    if (palavrasDeJogo.includes(palavra)) {
      if (!palavrasEncontradas.includes(palavra)) {
        tmp = Array.from(palavrasEncontradas);
        tmp.push(palavra);
        if (palavrasEncontradas.length === palavrasDeJogo.length - 1) {
          console.log("Vitoria");
        }
        return true;
      }
    }
    return false;
  }

  /* if (posOfClicks.length === 0) {
      setPosOfClicks(tmp);
      setXYInicio(selectedIndex);
    } else {
      setPosOfClicks(tmp);
      if (posOfClicks.length === 2 && selectedIndex !== posOfClicks[0]) {
        setXYFinal(selectedIndex);
        //processCoordenates();
      } else {
        setPosOfClicks([]);
      }
    }*/

   useEffect(() => {
     if (posOfClicks.length === 2) processCoordenates();
   }, [posOfClicks]);

  useEffect(() => {
    let palavrasJogo;
    let blocoInicial;
    let blocoDeJogo;

    blocoInicial = tabuleiroInicial(numLinhas, numColunas);
    console.log(blocoInicial);
    palavrasJogo = arraydePalavras(numLinhas, numPalavras);
    blocoDeJogo = meterPalavras(
      blocoInicial,
      numLinhas,
      numColunas,
      palavrasJogo
    );

    setBlocos(blocoDeJogo);
    setPalavrasDeJogo(palavrasJogo);
    //handleOnClick(palavrasJogo,blocoDeJogo);
    console.log(posOfClicks.length);

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
        setTimer(100);
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
          scoreBoard={scoreBoard}
          updateScoreBoard={updateScoreBoard}
        />
        <Gamepanel
          letras={blocos}
          selectedLevel={selectedLevel}
          gameStarted={gameStarted}
          palavras={palavrasDeJogo}
          scoreBoard={scoreBoard}
          handleOnClick={handleOnClick}
          clicked={clicked}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
