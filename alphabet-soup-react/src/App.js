import "./assets/styles/App.css";
import React from "react";
//import { useState } from "react";

import {
  Header,
  Footer,
  Gamepanel
} from "./components";


function App() {
  return (
    <div id="container" className="SoupaLetras">
      <Header />
      <Gamepanel />
      <Footer />
    </div>
  );
}

export default App;
