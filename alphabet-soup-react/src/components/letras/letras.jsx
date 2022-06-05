import React from "react";
import "./letras.css";


function Letras(letra) {
  return (
    <div className="letra" data-logo={letra.name}>
    </div>
  );
}

export default Letras;