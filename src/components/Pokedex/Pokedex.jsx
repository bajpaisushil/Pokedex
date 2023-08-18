import React from 'react'
import Search from '../Search/Search';
import PokemonList from '../PokemonList/PokemonList';
import './Pokedex.css';

function Pokedex() {
  return (
    <div className='pokedex_wrapper'>
    <h1>Pokedex</h1>
    <Search />
    <PokemonList />
    </div>
  )
}

export default Pokedex;
