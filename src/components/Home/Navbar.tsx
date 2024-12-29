import  { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from '../ui/Logo'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center text-white text-xl md:text-2xl font-bold">
            <Logo size={32} color="white" />
            <span className="ml-2">CryptoNotify</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <a href="#features" className="text-white hover:text-gray-300 transition duration-300">Features</a>
            <a href="#about" className="text-white hover:text-gray-300 transition duration-300">About</a>
            <a href="#contact" className="text-white hover:text-gray-300 transition duration-300">Contact</a>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90 backdrop-blur-md">
          <div className="container mx-auto px-4 py-2">
            <Link to="/dashboard" className="block text-white py-2" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <a href="#features" className="block text-white py-2" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#about" className="block text-white py-2" onClick={() => setIsOpen(false)}>About</a>
            <a href="#contact" className="block text-white py-2" onClick={() => setIsOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </nav>
  )
}

