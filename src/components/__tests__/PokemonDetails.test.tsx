import React from 'react'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import PokemonDetails from '../PokemonDetails'
import { FavoritesProvider } from '../../contexts/FavoritesContext'
import * as pokemonApi from '../../api/pokemonApi'

vi.mock('../../api/pokemonApi')

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  stats: [
    { base_stat: 45, stat: { name: 'hp' } },
    { base_stat: 49, stat: { name: 'attack' } },
  ],
  abilities: [{ ability: { name: 'overgrow' } }],
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'https://example.com/bulbasaur.png',
      },
    },
  },
}

describe('PokemonDetails', () => {
  beforeEach(() => {
    vi.mocked(pokemonApi.fetchPokemonDetails).mockResolvedValue(mockPokemon)
  })

  it('renders pokemon details', async () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <MemoryRouter initialEntries={['/pokemon/1']}>
            <Routes>
              <Route path="/pokemon/:id" element={<PokemonDetails />} />
            </Routes>
          </MemoryRouter>
        </FavoritesProvider>
      </QueryClientProvider>
    )

    expect(await screen.findByText('bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('grass')).toBeInTheDocument()
    expect(screen.getByText('poison')).toBeInTheDocument()
    expect(screen.getByText('hp')).toBeInTheDocument()
    expect(screen.getByText('attack')).toBeInTheDocument()
    expect(screen.getByText('overgrow')).toBeInTheDocument()
  })
})