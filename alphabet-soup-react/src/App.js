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
  //Variaveis de Estado
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

  //Update do ScoreBoard
  const updateScoreBoard = () => {
    setScoreBoard(JSON.parse(localStorage.getItem("scoreboard")));
  };

  //Limpar os Clickes
  const clearClicked = () => {
    setClicked(new Array(blocos.length));
  };

  //Dar update nos pontos conforme o timer, e se foi boa a jogada ou não
  const updatePoints = (operacaoSoma = true) => {
    let pointsSum = totalPoints;
    if (operacaoSoma) {
      pointsSum += timer * (palavrasDeJogo.length / 2);
    } else {
      pointsSum < 5 ? (pointsSum = 0) : (pointsSum -= 5);
    }
    setTotalPoints(pointsSum);
  };

  //Função que lida com o clique do botão de iniciar jogo
  const handleGameStart = () => {
    setGameStarted(!gameStarted);
  };

  //Função que lida com meter um palavra escolhida pelo jogador
  const handleOnSubmit = () => {
    let word = prompt("Introduza uma palavra");
    palavras.push(word.toUpperCase());
  };

  //Função que lida com clique em letras
  const handleOnClick = (event) => {
    const selectedIndex = event.target.dataset.key; //tem o index do bloco[0-tamanhoBloco]

    let tmp = Array.from(posOfClicks); //mete o que está dentro no var de estado posOFClicks no var tmp

    tmp.push(selectedIndex); //push do index clicada no tmp

    setPosOfClicks(tmp); // mete para dentro do posOfClicks o que tem dentro de tmp

    mudarCor(setClicked, tmp, 0); //trata de mudar cor dos clicked neste caso
  };

  const mudarCor = (setter, indexS, letra1, letra2) => {
    let tmp;
    let index1 = parseInt(indexS[0]); //index da primeira palavra clicada
    let index2;
    if (indexS.length === 2) index2 = parseInt(indexS[1]); //caso lenght 2 é a 2 letra e guarda a index esta var

    let YInicial = Math.floor(index1 / tamanhoBloco); //linha do primeiro click
    let XInicial = Math.floor(index1 % tamanhoBloco); //coluna do primeiro click

    let YFinal = Math.floor(index2 / tamanhoBloco); //linha do segundo click
    let XFinal = Math.floor(index2 % tamanhoBloco); //coluna do segundo click

    if (setter === setClicked) {
      tmp = new Array(blocos.length); // tmp é um array com mesmo tamanho ao tabuleiro de jogo
      tmp[YInicial * tamanhoBloco + XInicial] = true; // muda primeira letra de cor

      tmp[YFinal * tamanhoBloco + XFinal] = true; // muda segunda letra de cor

      setter(tmp); //manda o tmp com as posições clicked como true
    } else {
      tmp = Array.from(completa); // copia a variavel de estado completa para tmp

      let YInicial = Math.floor(letra1 / tamanhoBloco); //linha do primeiro click
      let XInicial = Math.floor(letra1 % tamanhoBloco); //coluna do primeiro click
      let YFinal = Math.floor(letra2 / tamanhoBloco); //linha do segundo click
      let XFinal = Math.floor(letra2 % tamanhoBloco); //coluna do segundo click

      const tamanhoPalavra =
        Math.max(Math.abs(XInicial - XFinal), Math.abs(YInicial - YFinal)) + 1; //calcula o tamanho da seleção feita pelo jogador, + 1 para não incluir 0

      let xOffset;
      let yOffset;

      //saber a dir da coluna
      if (YInicial > YFinal) yOffset = -1;
      else if (YInicial < YFinal) yOffset = 1;
      else yOffset = 0;

      //saber a dir da linha
      if (XInicial > XFinal) xOffset = -1;
      else if (XInicial < XFinal) xOffset = 1;
      else xOffset = 0;


      //mudar a cor da palavra completa por completo
      for (let index = 0; index < tamanhoPalavra; index++) {
        let y = YInicial + index * yOffset;
        let x = XInicial + index * xOffset;

        let i = y * tamanhoBloco + x;

        tmp[i] = true;
      }
      setter(tmp); //manda as posições em true das letras completas
    }
  };


  //Função que chama a verificação de palavra e depois chama a atualização de pontos
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
      }, 500);
    }
  };

  //Verifica apartir da coordenadas dos dois cliques se foi válida e se foi palavra de jogo
  function checkIfWord(letra1, letra2) {
    let YInicial = Math.floor(letra1 / tamanhoBloco);
    let XInicial = Math.floor(letra1 % tamanhoBloco);
    let YFinal = Math.floor(letra2 / tamanhoBloco);
    let XFinal = Math.floor(letra2 % tamanhoBloco);

    const tamanhoPalavra =
      Math.max(Math.abs(XInicial - XFinal), Math.abs(YInicial - YFinal)) + 1;

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

      //forma a palavra selecionada
    }

    //verificar a palavra construida
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

  //Este effect é chamada ao ser alterada a var de estado posOfClicks
  useEffect(() => {
    if (posOfClicks.length === 2) processCoordenates();
  }, [posOfClicks]);

  //QUando é clicado o botão de iniciar e terminar jogo, ou seja, var é alterada, entra aqui
  useEffect(() => {
    let palavrasJogo;
    let blocoInicial;
    let blocoDeJogo;

    blocoInicial = tabuleiroInicial(tamanhoBloco); //cria tabuleiro
    palavrasJogo = arraydePalavras(tamanhoBloco, numPalavras); //seleciona palavras de jogo
    blocoDeJogo = meterPalavras(blocoInicial, tamanhoBloco, palavrasJogo); // mete as palavras de jogo no tabuleiro e preenche o resto com random

    //set e reset de var
    setTotalPoints(0);
    setPalavrasEncontradas([]);
    setBlocos(blocoDeJogo);
    setPalavrasDeJogo(palavrasJogo);
    setCompleta(new Array(blocos.length));
    setClicked(new Array(blocos.length));

    //Lida com a mudaç do valor do timer
    if (gameStarted) {
      let nextTimer;
      timerId = setInterval(() => {
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          return nextTimer;
        });

        if (nextTimer === 0) {
          alert("O seu tempo terminou.");
          setGameStarted(false);
        }
      }, 1000);
    } else if (timer !== TIMEOUT) {
      setTimer(TIMEOUT);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted]);

  //Lida com saber o nível a ser jogada e mete as var com valores definidos para esse nível
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
