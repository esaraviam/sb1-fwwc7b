export interface Pokemon {
  id: number
  name: string
  types: string[]
}

export interface PokemonList {
  count: number
  results: Pokemon[]
}

export interface PokemonDetails {
  id: number
  name: string
  types: { type: { name: string } }[]
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  stats: { base_stat: number; stat: { name: string } }[]
  abilities: { ability: { name: string } }[]
}