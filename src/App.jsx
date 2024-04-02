import React from "react";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Dex from "./Dex";

const BASE_URL = 'https://pokeapi.co/api/v2/type/';

const App = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    requestTypes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestTypes() {
    const res = await fetch(BASE_URL);
    const json = await res.json();
  
    console.log(json);

    setTypes(json.results);
  }

  return (
    <div className="container">
      <h1>Pokedéx Beta</h1>
      { !types?.length ? ( <p>No Types Found</p> ) : <Dex results={types}/>}
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
