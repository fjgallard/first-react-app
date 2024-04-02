import React from "react";
import { createRoot } from "react-dom/client";
import Dex from "./Dex";

const App = () => {
  return (
    <div className="container">
      <h1>Pokedéx Beta</h1>
      <Dex/>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);