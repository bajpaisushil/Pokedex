import axios from "axios";

async function downloadPokemon(pokemonListState, setPokemonListState, POKEDEX_URL, limit=20){

    const response=await axios.get(pokemonListState.pokemonUrl? pokemonListState.pokemonUrl: POKEDEX_URL);
    let pokemonResults=response.data.results? response.data.results: response.data.pokemon;
    pokemonResults=pokemonResults.slice(0, limit);
    const pokemonPromise=pokemonResults?.map((p)=>{
        if(p.url){
            return  axios.get(p.url);
        }
        else if(p.pokemon.url){
            return  axios.get(p.pokemon.url)
        }
    });
    const pokemonListData=await axios.all(pokemonPromise);
    console.log(pokemonListData);
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

export default downloadPokemon;

