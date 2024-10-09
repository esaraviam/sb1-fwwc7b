import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Search, Filter } from 'lucide-react'
import { fetchPokemonList, fetchPokemonTypes } from '../api/pokemonApi'
import PokemonCard from './PokemonCard'
import Pagination from './Pagination'
import Loading from './Loading'
import Error from './Error'

const PokemonList: React.FC = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const limit = 20

  const { data: pokemonList, isLoading, isError } = useQuery(
    ['pokemonList', page, limit],
    () => fetchPokemonList(page, limit),
    { keepPreviousData: true }
  )

  const { data: pokemonTypes } = useQuery('pokemonTypes', fetchPokemonTypes)

  const filteredPokemon = pokemonList?.results.filter(pokemon =>
    (search === '' || pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
     pokemon.types.some(t => t.toLowerCase().includes(search.toLowerCase()))) &&
    (selectedType === '' || pokemon.types.includes(selectedType))
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value)
    setPage(1)
  }

  if (isLoading) return <Loading />
  if (isError) return <Error message="Failed to load Pokémon" />

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search Pokémon"
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="relative w-full sm:w-64">
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="">All Types</option>
            {pokemonTypes?.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <Filter className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon?.map(pokemon => (
          <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil((pokemonList?.count || 0) / limit)}
        onPageChange={setPage}
      />
    </div>
  )
}

export default PokemonList