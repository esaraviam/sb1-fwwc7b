import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { useFavorites } from '../contexts/FavoritesContext'
import { fetchPokemonDetails } from '../api/pokemonApi'
import PokemonCard from './PokemonCard'
import Loading from './Loading'
import Error from './Error'
import { Pokemon } from '../types/pokemon'

const Favorites: React.FC = () => {
  const { favorites } = useFavorites()

  const { data: favoritePokemon, isLoading, isError } = useQuery(
    ['favoritePokemon', favorites],
    () => Promise.all(favorites.map(id => fetchPokemonDetails(id.toString()))),
    { enabled: favorites.length > 0 }
  )

  if (isLoading) return <Loading />
  if (isError) return <Error message="Failed to load favorite Pokémon" />

  if (favorites.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400">
        <p className="text-xl mb-4">You haven't added any Pokémon to your favorites yet.</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go back to the Pokémon list
        </Link>
      </div>
    )
  }

  const formatPokemonData = (pokemon: any): Pokemon => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map((t: any) => t.type.name)
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Your Favorite Pokémon</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoritePokemon?.map(pokemon => (
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <PokemonCard pokemon={formatPokemonData(pokemon)} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Favorites