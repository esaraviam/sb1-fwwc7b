import React from 'react'
import { render, screen } from '@testing-library/react'
import PokemonCard from '../PokemonCard'

describe('PokemonCard', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    types: ['grass', 'poison'],
  }

  it('renders pokemon name and types', () => {
    render(<PokemonCard pokemon={mockPokemon} />)
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('grass')).toBeInTheDocument()
    expect(screen.getByText('poison')).toBeInTheDocument()
  })

  it('displays the correct image', () => {
    render(<PokemonCard pokemon={mockPokemon} />)
    
    const image = screen.getByAltText('bulbasaur') as HTMLImageElement
    expect(image.src).toContain('1.png')
  })
})