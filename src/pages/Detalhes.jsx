import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './Detalhes.css';

function Detalhes() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const capturarPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        setPokemon(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    capturarPokemon();
  }, [pokemonName]);

  if (!pokemon) {
    return <div className='dCaptura'>Capturando Pokemon...</div>;
  }

  return (
    <div className="Dcontainer">
      <h1 className="dTitle">Detalhes do Pokémon Capturado:</h1>

        <div className="dTitle">
          {pokemon.name}
        </div>

      <div className="detalhes-container">
        <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="dImage" />
        

        <div className="dInfo">
          <span>Habilidades: </span>
          {pokemon.abilities.map((ability) => (
            <span key={ability.slot}>{ability.ability.name} </span>
          ))}
        </div>

        <div className="dInfo">
          <span>Peso: </span> {pokemon.weight / 10} kg
        </div>

        <div className="dInfo">
          <span>Altura: </span> {pokemon.height / 10} m
        </div>

        <Link to="/">
          <button className="dButton">Voltar a Pokedex</button>
        </Link>

      </div>
    </div>
  );
}

export default Detalhes;