import "./gamepanel.css";

function GamePanel(props) {
  const { letras, selectedLevel , palavras} = props;
  let gameClasse = "";
  
  console.log(`gamePanel Render`);

  if (selectedLevel === "2") {
    gameClasse = "intermedio";
  } else if (selectedLevel === "3") {
    gameClasse = "avancado";
  } else {
    gameClasse = "";
  }

  console.log(letras);
  console.log(selectedLevel); 

  return (
    <section className="game-panel">
      <div class="flex-container">
        <div class="flex-child primeiro">
          
          <h3 className={(selectedLevel === "0" ? "esconder" : "")}>Palavras do Jogo</h3>

          {palavras.map(palavras => <h2>{palavras}</h2>)}
          
        </div>
        <div id="game" className={`${gameClasse}`} class="flex-child segundo">
           {letras}
        </div>
      </div>
    </section>
  );
}
export default GamePanel;