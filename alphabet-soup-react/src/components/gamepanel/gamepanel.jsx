import "./gamepanel.css";
import Letras from "../letras/letras";
import { checkIfIsClicked, checkIfCompleted, checkIfWord} from "../../helpers"

function GamePanel(props) {
  const { letras, selectedLevel , gameStarted, handleOnClick,palavras,clicked} = props;
  const clickedClass = clicked ? " flipped" : "";
  let gameClasse = "";
  
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
          {letras.map((letra, index) => (
            <Letras
              key={letra.key}
              letra={
                <h1 className={"letra-front"} data-key={letra.key}>
                  {letra.name}
                </h1>
              }
              onClick={handleOnClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default GamePanel;