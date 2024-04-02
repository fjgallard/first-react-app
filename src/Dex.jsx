import { useState } from "react";
import usePokemonList from "./usePokemonList";

const Dex = ({ results }) => {
  const [selectedType1, setType1] = useState("");
  const [selectedType2, setType2] = useState("");
  const [pokemonList] = usePokemonList(selectedType1, selectedType2);

  return (
    <div>
      <form>

      <label htmlFor="type">
        Type 1
        <select 
        id="type1"
        value={selectedType1}
        onChange={ e => setType1(e.target.value)}>
          <option />
          {results.map((result) => (
            <option key={result.name}>{result.name}</option>
          ))}
        </select>
      </label>

      <label htmlFor="type">
        Type 2
        <select 
        id="type2"
        value={selectedType2}
        onChange={ e => setType2(e.target.value)}>
          <option />
          {results.map((result) => (
            <option key={result.name}>{result.name}</option>
          ))}
        </select>
      </label>

      <button>Submit</button>
      </form>

      <div>
        <ul>
          { pokemonList.map(pokemon => (
            <li key={pokemon.pokemon.name}>{pokemon.pokemon.name}</li>
          ))}
        </ul>
      </div>
    </div>
    
  );
}

export default Dex;