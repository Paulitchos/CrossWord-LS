import Letras from "../letras/letras";
import "./gamepanel.css";
import { LETRAS_LOGOS} from "../../constants/index";
import { shuffleArray } from "../../helpers";


function GamePanel(props) {
  const { letras, selectedLevel} = props;
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

  return (
    <section className="game-panel">
      <h3 className="sr-only">Letras do Jogo</h3>
      <div id="game" className={`${gameClasse}`}>
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
    </section>
  );
}
export default GamePanel;