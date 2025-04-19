import React, { useState } from 'react';

const LoginRegisterHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="p-4 transition-colors duration-300 bg-white shadow-md dark:bg-gray-900 dark:text-white">
      <div className="container flex items-center justify-between h-16 mx-auto">
        <a
          href="/"
          aria-label="Back to homepage"
          className="flex items-center -mt-2 space-x-2 transition-transform duration-300 hover:scale-105"
        >
          <img
            src="/Dra. Tatiane.png"
            alt="Logo Dra. Tatiane"
            style={{ width: '150px', height: 'auto' }}
          />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden space-x-6 lg:flex animate-fade-in">
          <li>
            <a
              href="#"
              className="text-gray-700 transition-colors duration-200 border-b-2 border-transparent dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-600 dark:hover:border-violet-400"
            >
              Sobre
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 transition-colors duration-200 border-b-2 border-transparent dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-600"
            >
              Procedimentos
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 transition-colors duration-200 border-b-2 border-transparent dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-600"
            >
              Contato
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 transition-colors duration-200 border-b-2 border-transparent dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-600"
            >
              Rede sociais
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="p-2 transition-colors duration-300 rounded lg:hidden hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mt-2 lg:hidden animate-fade-in">
          <ul className="flex flex-col p-4 space-y-2 bg-white rounded-md shadow-md dark:bg-gray-900">
            <li>
              <a href="#" className="block px-4 py-2 text-gray-700 rounded dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                Sobre
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-gray-700 rounded dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                Procedimentos
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-gray-700 rounded dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                Contato
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-gray-700 rounded dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                Rede sociais
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default LoginRegisterHeader;
