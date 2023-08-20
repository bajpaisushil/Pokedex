import axios from "axios";
import React, { useEffect, useState } from "react";
import downloadPokemon from "../utils/downloadPokemons";
import { useParams } from "react-router-dom";

function usePokemon(pokemonName) {
  const { id } = useParams();
  const POKEMON_DETAIL_URL = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemon, setPokemon] = useState({});

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    pokemonUrl: "",
    prevUrl: "",
    nextUrl: "",
  });

  async function downloadGivenPokemon(id) {
    const response = await axios.get(
      POKEMON_DETAIL_URL + (pokemonName ? pokemonName : id)
    );
    console.log(response);
    setPokemon({
      name: response.data.name,
      height: response.data.height,
      weight: response.data.weight,
      types: response.data.types,
      image: response.data.sprites.other.dream_world.front_default,
    });
    const types = response.data.types.map((t) => t.type.name);
    return types[0];
  }
  async function downloadPokemonAndRelated(id) {
    try {
      const type = await downloadGivenPokemon(id);
      await downloadPokemon(
        pokemonListState,
        setPokemonListState,
        `https://pokeapi.co/api/v2/type/${type}`
      );
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
    downloadPokemonAndRelated(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, pokemonName]);

  return [pokemon, pokemonListState];
}

export default usePokemon;
