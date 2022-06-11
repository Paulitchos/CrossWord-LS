import Letras from "../letras/letras";
import "./gamepanel.css";
import { LETRAS_LOGOS} from "../../constants/index";
import { shuffleArray } from "../../helpers";


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
            {letras.map((bloco,index) => {
              return bloco.map((blocoInner,innerIndex) => {
                return (
                  <ol>
                    {(() => {
                      let randomletters = shuffleArray(LETRAS_LOGOS);
                      if (blocoInner === "") {
                        return (
                          <Letras
                            key={`${index} ${innerIndex}`}
                            name={`${randomletters.slice(0,1)}`}
                          />
                        );
                      } else {
                        //console.log(blocoInner[''])
                        return <Letras key={`${blocoInner['key']}`} name={`${blocoInner['name']}`} />;
                      }
                    })()}
                  </ol>
                );
              });
            })}
        </div>
      </div>
    </section>
  );
}
export default GamePanel;