import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Heart } from 'lucide-react'
import { fetchPokemonDetails } from '../api/pokemonApi'
import { useFavorites } from '../contexts/FavoritesContext'
import Loading from './Loading'
import Error from './Error'

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: pokemon, isLoading, isError } = useQuery(['pokemonDetails', id], () => fetchPokemonDetails(id!))
  const { favorites, toggleFavorite } = useFavorites()

  if (isLoading) return <Loading />
  if (isError) return <Error message="Failed to load Pokémon details" />

  const isFavorite = favorites.includes(pokemon.id)

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-64 h-64 object-contain bg-gray-100 dark:bg-gray-700 rounded-lg"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white capitalize">{pokemon.name}</h1>
            <button
              onClick={() => toggleFavorite(pokemon.id)}
              className={`p-2 rounded-full ${
                isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {pokemon.types.map(type => (
              <span
                key={type.type.name}
                className="px-3 py-1 text-sm font-semibold rounded-full text-white"
                style={{ backgroundColor: getPokemonTypeColor(type.type.name) }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Stats</h2>
              {pokemon.stats.map(stat => (
                <div key={stat.stat.name} className="flex items-center mb-2">
                  <span className="w-24 text-gray-600 dark:text-gray-400 capitalize">{stat.stat.name}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 rounded-full h-2"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">{stat.base_stat}</span>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Abilities</h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                {pokemon.abilities.map(ability => (
                  <li key={ability.ability.name} className="capitalize">{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails