import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pokemon from '../Pokemon/Pokemon';
import './PokemonList.css';

function PokemonList() {
    const POKEDEX_URL='https://pokeapi.co/api/v2/pokemon';
    // const [pokemonList, setPokemonList]=useState([]);
    // const [pokemonUrl, setPokemonUrl]=useState(POKEDEX_URL);
    // const [prevUrl, setPrevUrl]=useState(POKEDEX_URL);
    // const [nextUrl, setNextUrl]=useState(POKEDEX_URL);
    const [pokemonListState, setPokemonListState]=useState({
        pokemonList: [],
        pokemonUrl: POKEDEX_URL,
        prevUrl: POKEDEX_URL,
        nextUrl: POKEDEX_URL,
    })

    async function downloadPokemon(){
        const response=await axios.get(pokemonListState.pokemonUrl? pokemonListState.pokemonUrl: POKEDEX_URL);
        const pokemonResults=response.data.results;
        // setPokemonListState((prev)=> ({...prev, nextUrl: response.data.next, prevUrl: response.data.previous}))
        const pokemonPromise=pokemonResults?.map((pokemon)=> axios.get(pokemon.url));
        const pokemonListData=await axios.all(pokemonPromise);
        const pokemonFinalList=pokemonListData?.map(pokemonData=> {
            const pokemon=pokemonData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types,

            }
        })
        setPokemonListState((prev)=> ({...prev, pokemonList: pokemonFinalList, nextUrl: response.data.next, prevUrl: response.data.previous}));
    }
    useEffect(()=>{
        downloadPokemon();
    }, [pokemonListState.pokemonUrl]);
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

