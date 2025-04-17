import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600">
          {/* Substitua por uma imagem do logo se tiver */}
          TP Odontologia
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-indigo-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/servicos" className="text-gray-700 hover:text-indigo-500">
                Serviços
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="text-gray-700 hover:text-indigo-500">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link to="/contato" className="text-gray-700 hover:text-indigo-500">
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:hidden">
          <button className="text-gray-500 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-indigo-500">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;