import { Facebook, Twitter, Instagram, GitlabIcon as GitHub } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">CryptoNotify</h3>
            <p className="text-gray-400">Stay connected to your crypto world</p>
          </div>
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition duration-300">Features</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300"><Instagram /></a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300"><GitHub /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; 2023 CryptoNotify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

