import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PokemonDetails.css";
import usePokemon from "../../hooks/usePokemon";
import Pokemon from "../Pokemon/Pokemon";

function PokemonDetails({pokemonName}) {
  const [pokemon, pokemonListState]=usePokemon(pokemonName);
  return (
    <div>
        <h1>
            <Link to='/'>
                Pokedex
            </Link>
        </h1>
    <div className="pokemon_details_wrapper">
      <div className="pokemon_detail_name">{pokemon.name}</div>
      <div className="pokemon_image_container">
        <img className="pokemon_image" src={pokemon.image} />
      </div>
      <div className="pokemon_attr">
        <div className="pokemon_height">Height: {pokemon.height}</div>
        <div className="pokemon_weight">Weight: {pokemon.weight}</div>
      </div>
      <div className="pokemon_types">
        <h1>Type:  </h1>
        {pokemon.types?.map((t) => (
          <span className="type" key={t.type.name}>{t.type.name}</span>
        ))}
      </div>
    </div>
    <div className="similar_pokemons">
      <h2>Similar Pokemons</h2>
      <div className="pokemon_similar_boxes">
        {pokemonListState.pokemonList.length>0 && 
        pokemonListState.pokemonList.map(pokemon=> <Pokemon key={pokemon.id} id={pokemon.id} name={pokemon.name} url={pokemon.image} types={pokemon.types} />)
        }
      </div>
    </div>
    </div>
  );
}

export default PokemonDetails;
