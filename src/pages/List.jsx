import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './List.css';

function List() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const capturarPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        const results = response.data.results;
        const pokemonDataPromises = results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data;
        });
        const pokemonData = await Promise.all(pokemonDataPromises);
        setPokemons(pokemonData);
      } catch (error) {
        console.error(error);
      }
    };

    capturarPokemon();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Pokedex Pokemon:</h1>
      <div className="card-container">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="card">
            <Link to={`/details/${pokemon.name}`} className="link">
              <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="image" />
              <div className="name">{pokemon.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;