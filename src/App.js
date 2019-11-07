import React, { useState } from 'react';
import './App.css';

function App() {
  
  const pokemon = [
    { name: "Bulbasaur" },
    { name: "Venosaur" },
    { name: "Ivysaur" }
  ]

  // This is the internal state
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  console.log("App is being rendered ...");
  
  return (
    <div className="pokedex">
      <PokedexList 
        pokemon={pokemon}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
      <div className="pokedex-description"></div>
      <div className="pokedex-image"></div>
      <div className="pokedex-summary"></div>
    </div>
  );
}

function PokedexList(props) {
  const { pokemon, selectedPokemon, setSelectedPokemon } = props;

  return (
    <ul className="pokedex-list">
      <li>Selected: {selectedPokemon}</li>
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

export default App;
