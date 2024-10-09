import axios from 'axios'
import { Pokemon, PokemonList, PokemonDetails } from '../types/pokemon'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

export const fetchPokemonList = async (page: number, limit: number, type?: string, search?: string): Promise<PokemonList> => {
  const offset = (page - 1) * limit
  let url = `${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`

  const response = await axios.get(url)
  let pokemonList = await Promise.all(
    response.data.results.map(async (pokemon: { name: string, url: string }) => {
      const detailsResponse = await axios.get(pokemon.url)
      return {
        id: detailsResponse.data.id,
        name: detailsResponse.data.name,
        types: detailsResponse.data.types.map((type: { type: { name: string } }) => type.type.name),
      }
    })
  )

  // Apply type filter if specified
  if (type) {
    pokemonList = pokemonList.filter(pokemon => pokemon.types.includes(type))
  }

  // Apply search filter if specified
  if (search) {
    const searchLower = search.toLowerCase()
    pokemonList = pokemonList.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchLower) ||
      pokemon.types.some(t => t.toLowerCase().includes(searchLower))
    )
  }

  return {
    count: response.data.count,
    results: pokemonList as Pokemon[],
  }
}

export const fetchPokemonDetails = async (id: string): Promise<PokemonDetails> => {
  const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`)
  return response.data
}

export const fetchPokemonTypes = async (): Promise<string[]> => {
  const response = await axios.get(`${API_BASE_URL}/type`)
  return response.data.results.map((type: { name: string }) => type.name)
}