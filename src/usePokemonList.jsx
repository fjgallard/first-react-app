import { useEffect, useState } from "react";

const BASE_URL = 'https://pokeapi.co/api/v2/type';

const localCache = {};
let pokemonList1 = [];
let pokemonList2 = [];

export default function usePokemonList(type1, type2) {
  const [pokemonList, setPokemonList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    // Type 1 Checking
    if(!type1) {
      pokemonList1 = [];
    } else if(localCache[type1]) {
      pokemonList1 = localCache[type1];
      const combinedList = intersection(pokemonList1, pokemonList2);
      setPokemonList(combinedList)
    } else {
      queryPokemonByType(type1, 1);
    }

    // Type 2 Checking
    if(!type2) {
      pokemonList2 = [];
    } else if(localCache[type2]) {
      pokemonList2 = localCache[type2];
      const combinedList = intersection(pokemonList1, pokemonList2);
      setPokemonList(combinedList)
    } else {
      queryPokemonByType(type2, 2);
    }

    async function queryPokemonByType(type, listNumber) {
      setStatus('loading');
      const res = await fetch(`${BASE_URL}/${type}`);
      const json = await res.json();
      
      localCache[type] = json.pokemon;
      listNumber === 1 ? pokemonList1 = localCache[type] : pokemonList2 = localCache[type];

      setPokemonList([]);
      const combinedList = intersection(pokemonList1, pokemonList2);
      setStatus('loaded');
      setPokemonList(combinedList)
    }

    function intersection(list1, list2) {
      if (!list2 || list2.length === 0) {
        return list1;
      }

      const resList = [];
      list1.forEach(item => {
        const newList = list2.filter(listItem => listItem.pokemon.name === item.pokemon.name);
        if (newList[0]) {
          resList.push(newList[0]);
        }
        
      });
      return resList;
    }

  }, [type1, type2])

  return [pokemonList, status];
}