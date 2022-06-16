import "./gamepanel.css";

function GamePanel(props) {
  const { letras, selectedLevel , gameStarted,palavras} = props;
  let gameClasse = "";
  
 //console.log(`gamePanel Render`);
console.log(letras)
 switch (selectedLevel) {
   case "2":
     gameClasse = "intermedio";
     break;
   case "3":
     gameClasse = "avancado";
     break;
   default:
     gameClasse = "";
     break;
 }

  return (
    <section className="game-panel">
      <div className="flex-container">
        <div className="flex-child primeiro">
          <h3 className={gameStarted ? "" : " esconder"}>Palavras do Jogo</h3>

          {palavras.map((palavras) => (
            <h2 className={gameStarted ? "" : " esconder"}>{palavras}</h2>
          ))}
        </div>
        <div
          id="game"
          className={gameClasse + (gameStarted ? "" : " esconder")}
        >
        {letras}
        </div>
      </div>
    </section>
  );
}
export default GamePanel;