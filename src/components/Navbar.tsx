import React from 'react'
import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
            Pokédex
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/favorites" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Favorites
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar