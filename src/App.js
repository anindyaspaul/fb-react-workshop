import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [pokemon, setPokemon] = useState([]);
  const [details, setDetails] = useState(null);
  // This is the internal state
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // 3 promise states: pending, fulfilled, rejected
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(response => response.json())
      .then(data => {
        setPokemon(data.results);
      });
  }, []);

  useEffect(() => {
    if(selectedPokemon != null) {
      fetch("https://pokeapi.co/api/v2/pokemon/" + selectedPokemon)
      .then(response => response.json())
      .then(data => {
        setDetails(data);
      });
    }
  }, [selectedPokemon]);

  console.log("App is being rendered ...");
  
  return (
    <div className="pokedex">
      <PokedexList 
        pokemon={pokemon}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
      <div className="pokedex-description"></div>
      <PokedexImage
        details={details}
      />
      <PokedexSummary 
        details={details}
      />
    </div>
  );
}

function PokedexList(props) {
  const { pokemon, selectedPokemon, setSelectedPokemon } = props;

  return (
    <ul className="pokedex-list">
      {pokemon.map((p, index) => {
        const number = String(index + 1).padStart(3, "0");
        const buttonClass = p.name === selectedPokemon ? "active": null;
        return (
          <li key={p.name}>
            <button 
              className={buttonClass}
              onClick={() => {
              setSelectedPokemon(p.name);
              console.log(p.name + " was clicked.");

            }}>
              <strong>{number}</strong> {p.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function PokedexImage(props) {
  return (
    <div className="pokedex-image">
      { props.details != null ? <img src={props.details.sprites.front_default} /> : null }
    </div>
  );
}

function PokedexSummary(props) {
  let content = null;
  if(props.details != null) {
    content = <h1>{props.details.name}</h1>;
  }
  
  return (
    <div className="pokedex-summary">
      {content}
    </div>
  );
}

export default App;
