// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [listaPokemon, setListaPokemon] = useState([]);
  const [detallePokemon, setDetallePokemon] = useState({});
  const [paginacion, setPaginacion] = useState({ next: '', previous: '' });
  const [fetching, setFetching] = useState(false);

  const cargarPokemon = async () => {
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=807";

    try {
      const respuesta = await axios.get(URL);
      setListaPokemon(respuesta.data.results);
      setPaginacion({
        next: respuesta.data.next,
        previous: respuesta.data.previous
      });
      setFetching(true);
    } catch (error) {
      console.log("Ocurrió un error", error);
    }
  };

  const cargarDetallePokemon = async (urlPoke) => {
    try {
      const respuesta = await axios.get(urlPoke);
      setDetallePokemon(respuesta.data);
    } catch (error) {
      console.log("Ocurrió un error", error);
    }
  };

  return (
    <>
      <h1> API de Pokemon con Axios </h1>
      <div className='contenedor-pokemon'>
        <button onClick={cargarPokemon} className="fetch-pokemon-button">Fetch Pokemon</button>
        {fetching && (
          <div>
            <div>
              {detallePokemon.name ? (
                
                <DetallePokemon infoPokemon={detallePokemon} />
              ) : (
                
                "Haz click en un pokemon"
              
              )}
            </div>
            <ul>
              {listaPokemon.map((pokemon, index) => (
                <li key={index}>
                  <button onClick={() => cargarDetallePokemon(pokemon.url)}>
                    {pokemon.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

const DetallePokemon = (props) => {
  return (
    <div>
      <h2> Nombre: {props.infoPokemon.name} </h2>
      <p> Altura: {props.infoPokemon.height} </p>
      <p> Peso: {props.infoPokemon.weight} </p>
      <img src={props.infoPokemon.sprites.other.dream_world.front_default} alt={props.infoPokemon.name} />
    </div>
  );
};

export default App;
