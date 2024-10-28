import { Link } from 'react-router-dom'

const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold text-white">
          Blog Platform
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
            Home
          </Link>
        </div>
      </div>
    </nav>
  </header>
)

export default Navbar
