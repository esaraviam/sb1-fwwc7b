import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import Favorites from './components/Favorites'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<PokemonList />} />
                <Route path="/pokemon/:id" element={<PokemonDetails />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App