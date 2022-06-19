import React from "react";
import "./letras.css";


function Letras({letra, onClick}) {

  return (
    <div className={"letra"} onClick={onClick} data-key={letra.key}>
      {letra}
    </div>
  );
}

export default Letras;