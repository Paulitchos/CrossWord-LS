import React from "react";
import "./letras.css";


function Letras({letra,onCLick}) {
  //console.log("Letra Render: " + letra.name);
  return (
    <div onClick={onClick} className="letra flipped" data-logo={letra.name}>
      {<h1 className="letra-front">{letra.name}</h1>}
    </div>
  );
}

export default Letras;