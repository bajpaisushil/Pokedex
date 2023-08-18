import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PokemonDetails.css";

function PokemonDetails() {
  const { id } = useParams();
  const POKEMON_DETAIL_URL = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemon, setPokemon] = useState({});

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      height: response.data.height,
      weight: response.data.weight,
      types: response.data.types,
      image: response.data.sprites.other.dream_world.front_default,
    });
  }
  useEffect(() => {
    downloadPokemon();
  }, []);
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
    </div>
  );
}

export default PokemonDetails;
