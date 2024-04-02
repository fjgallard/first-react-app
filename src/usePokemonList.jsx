import { useEffect, useState } from "react";

const BASE_URL = 'https://pokeapi.co/api/v2/type';

const localCache = {};

export default function usePokemonList(type1, type2) {
  const [pokemonList, setPokemonList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if(!type1) {
      setPokemonList([]);
    } else if(localCache[type1]) {
      setPokemonList(localCache[type1]);
    } else {
      requestPokemonList();
    }

    async function requestPokemonList() {
      setPokemonList([]);
      setStatus("loading");

      console.log(type1);
      console.log(type2);

      const res = await fetch(`${BASE_URL}/${type1}`);
      const json = await res.json();
      localCache[type1] = json.pokemon;

      setPokemonList(localCache[type1])
      setStatus('loaded');
    }

  }, [type1, type2])

  return [pokemonList, status];
}