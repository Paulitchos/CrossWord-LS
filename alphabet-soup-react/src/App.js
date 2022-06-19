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
  const [tamanhoBloco, setTamanhoBloco] = useState(0);
  //const [numColunas, setNumColunas] = useState(0);
  const [numPalavras, setNumPalavras] = useState(0);
  const [palavrasDeJogo, setPalavrasDeJogo] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [scoreBoard, setScoreBoard] = useState([]);
  const [posOfClicks, setPosOfClicks] = useState([]);
  const [XYInicio, setXYInicio] = useState(undefined);
  const [XYFinal, setXYFinal] = useState(undefined);
  const [clicked, setClicked] = useState(new Array(blocos.length));
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
    //console.log(posOfClicks.length);
    const selectedIndex = event.target.dataset.key;

    

    let tmp = Array.from(posOfClicks);

    tmp.push(selectedIndex);

    setPosOfClicks(tmp);

    mudarCor(setClicked,tmp,0);
  };

  const mudarCor = (setter,indexS,i,letra1,letra2) => {
    let tmp;
    if(i===0){

      let index1 = parseInt(indexS[0]);
      let index2;
      console.log(index1);
      if (indexS.length === 2) index2 = parseInt(indexS[1]);

      let XInicial = Math.floor(index1 / tamanhoBloco);
      let YInicial = Math.floor(index1 % tamanhoBloco);

      let XFinal = Math.floor(index2 / tamanhoBloco);
      let YFinal = Math.floor(index2 % tamanhoBloco);

      tmp = new Array(blocos.length);

      tmp[XInicial * tamanhoBloco + YInicial] = true;

      tmp[XFinal * tamanhoBloco + YFinal] = true;

      setter(tmp);

      
    } else {

      let XInicial = Math.floor(letra1 / tamanhoBloco);
      let YInicial = Math.floor(letra1 % tamanhoBloco);
      let XFinal = Math.floor(letra2 / tamanhoBloco);
      let YFinal = Math.floor(letra2 % tamanhoBloco);

      setClicked(new Array(blocos.length));


    }
    //console.log(setter);
    

  
   

    //if (setter === setCompleted) tmp = Array.from(completed);
    /*else*/ 

    /*if (YInicial > YFinal) xOffset = -1;
    else if (YInicial < YFinal) xOffset = 1;
    else xOffset = 0;

    if (XInicial > XFinal) yOffset = -1;
    else if (XInicial < XFinal) yOffset = 1;
    else yOffset = 0;

    x = XInicial;
    y = YInicial;

    do {
      tmp[x * tamanhoBloco + y] = true;
      x += xOffset;
      y += yOffset;
    } while (x !== XFinal + yOffset || y !== YFinal + xOffset); */

   
    
  };


  const processCoordenates = () => {
    console.log("Entrou");
    console.log(posOfClicks[0]);
    console.log(posOfClicks[1]);
    
    const cordLetra1 = posOfClicks[0];
    const cordLetra2 = posOfClicks[1];
    let itsAWord = checkIfWord(cordLetra1, cordLetra2);
    
    if (itsAWord) {
      console.log("Entrou");
      setTimeout(() => {
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
    }
  };

  function checkIfWord(letra1, letra2) {
    console.log(letra1);
    let XInicial = Math.floor(letra1 / tamanhoBloco);
    let YInicial = Math.floor(letra1 % tamanhoBloco);
    let XFinal = Math.floor(letra2 / tamanhoBloco);
    let YFinal = Math.floor(letra2 % tamanhoBloco);

    //console.log(XInicial);
    //console.log(YInicial);

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
    console.log(tamanhoBloco);
    //console.log(blocos[0].name);
    
    if (x !== XFinal + yOffset && y !== YFinal + xOffset){
     
      mudarCor(setClicked, tmp, 1,letra1,letra2);
      return false;
    }

      while (true) {
        console.log(XFinal);
        palavra += blocos[x * tamanhoBloco + y].name;
        x += yOffset;
        y += xOffset;
        console.log(x);
        console.log(palavra);

        if (x === XFinal + yOffset && y === YFinal + xOffset) break;
      }

    if (palavrasDeJogo.includes(palavra)) {
      console.log(palavrasEncontradas);
      if (!palavrasEncontradas.includes(palavra)) {
        tmp = Array.from(palavrasEncontradas);
        tmp.push(palavra);
        if (palavrasEncontradas.length === palavrasDeJogo.length - 1) {
          console.log("Vitoria");
        }
        setPalavrasEncontradas(tmp);
        //console.log("Vitoria");
        return true;
      }
      return false;
    }
      mudarCor(setClicked, tmp, 1, letra1, letra2);
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
    console.log(blocoInicial);
    palavrasJogo = arraydePalavras(tamanhoBloco, numPalavras);
    blocoDeJogo = meterPalavras(
      blocoInicial,
      tamanhoBloco,
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
        setTamanhoBloco(10);
        setNumPalavras(6);
        setTimer(100);
        break;
      // Level: Intermediate
      case "2":
        setTamanhoBloco(11);
        setNumPalavras(8);
        setTimer(200);
        break;
      // Level: Advanced
      case "3":
        setTamanhoBloco(12);
        setTimer(220);
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
