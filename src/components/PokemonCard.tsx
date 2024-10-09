import React from 'react'
import { Pokemon } from '../types/pokemon'

interface PokemonCardProps {
  pokemon: Pokemon
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
        className="w-full h-48 object-contain bg-gray-100 dark:bg-gray-700"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white capitalize">{pokemon.name}</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-semibold rounded-full text-white"
              style={{ backgroundColor: getPokemonTypeColor(type) }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const getPokemonTypeColor = (type: string): string => {
  const colors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  }
  return colors[type.toLowerCase()] || '#777'
}

export default PokemonCard