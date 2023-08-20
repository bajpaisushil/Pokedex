import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pokemon from '../Pokemon/Pokemon';
import './PokemonList.css';
import usePokemonList from '../../hooks/usePokemonList';

function PokemonList() {
    const POKEDEX_URL='https://pokeapi.co/api/v2/pokemon';

    const [pokemonListState, setPokemonListState]=usePokemonList(POKEDEX_URL);
  return (
    <div className='pokemon_list_wrapper'>
        <div className='pokemon_list_header'>
            <h1>PokemonList</h1>
            <div className='page_controls'>
                <button className='prev-btn' onClick={()=> setPokemonListState({...pokemonListState, pokemonUrl: pokemonListState.prevUrl})}>Prev</button>
                <button className='next-btn' onClick={()=> setPokemonListState({...pokemonListState, pokemonUrl: pokemonListState.nextUrl})}>Next</button>
            </div>
        </div>
        <div className='pokemon_list'>
        {pokemonListState.pokemonList.map(pokemon=> <Pokemon key={pokemon.id} id={pokemon.id} name={pokemon.name} url={pokemon.image} types={pokemon.types} />)}
        </div>
    </div>
  )
}

export default PokemonList;

