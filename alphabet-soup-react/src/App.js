import "./assets/styles/App.css";
import React from "react";
//import { useState } from "react";

import {
  Header
} from "./components";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div id ="container" className="SoupaLetras">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
