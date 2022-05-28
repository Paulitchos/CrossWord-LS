import React from "react";
import "./letras.css";
import { PLACEHOLDER_CARD_PATH } from "../../constants/index";


function Letras(letra) {
  return (
     // <div className="card flipped" data-logo={letra.name}></div>
    <div className="letra" data-logo={letra.name}>
      <div className = "letra-back" alt= "letra" />
      <img
        src={`${PLACEHOLDER_CARD_PATH}${letra.name}.png`}
        className="letra-front"
        alt="letra"
      />
    </div>
  );
}

export default Letras;