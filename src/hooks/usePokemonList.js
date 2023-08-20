import axios from 'axios';
import React, { useEffect, useState } from 'react'
import downloadPokemon from '../utils/downloadPokemons';

function usePokemonList(POKEDEX_URL) {
    const [pokemonListState, setPokemonListState]=useState({
        pokemonList: [],
        pokemonUrl: POKEDEX_URL,
        prevUrl: POKEDEX_URL,
        nextUrl: POKEDEX_URL,
    })

    
    useEffect(()=>{
        downloadPokemon(pokemonListState, setPokemonListState, POKEDEX_URL);
    }, [pokemonListState.pokemonUrl]);
    
    return [pokemonListState, setPokemonListState];
}

export default usePokemonList;

