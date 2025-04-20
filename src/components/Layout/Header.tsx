import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        <ul className="items-center hidden space-x-6 lg:flex animate-fade-in">
          <li>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-700 hover:border-violet-600"
            >
              Sobre
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-700 hover:border-violet-600"
            >
              Procedimentos
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-700 hover:border-violet-600"
            >
              Contato
            </a>
          </li>

            {/* Redes Sociais Dropdown */}
            <li
            className="relative"
            onMouseEnter={() => {
              clearTimeout((window as any).dropdownTimeout);
              setIsDropdownOpen(true);
            }}
            onMouseLeave={() => {
              (window as any).dropdownTimeout = setTimeout(() => {
              setIsDropdownOpen(false);
              }, 100); // Timeout of 300ms
            }}
            >
            <div className="text-gray-700 cursor-pointer dark:text-gray-200 hover:text-indigo-700">
              Redes sociais
            </div>

            {isDropdownOpen && (
              <div
              className="absolute left-0 z-10 w-40 mt-2 transition-all duration-200 origin-top transform scale-y-100 bg-white border border-gray-200 rounded-md shadow-lg opacity-100 dark:bg-gray-800 dark:border-gray-700"
              >
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/seunumerowhatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                WhatsApp
              </a>
              </div>
            )}
            </li>
          </ul>

        {/* Auth Buttons */}
        <div className="items-center hidden space-x-4 lg:flex animate-fade-in">
          <a
            href="/login"
            className="px-5 py-2 text-indigo-700 border border-indigo-700 rounded hover:bg-indigo-700 hover:text-white"
          >
            Entrar
          </a>
          <a
            href="/register"
            className="px-5 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-800"
          >
            Registrar
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="p-2 rounded lg:hidden hover:bg-gray-200 dark:hover:bg-gray-700"
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
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Sobre
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Procedimentos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Contato
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/seunumerowhatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href="/login" className="block px-4 py-2 text-violet-600 hover:bg-violet-100">
                Entrar
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="block px-4 py-2 text-white rounded bg-violet-600 hover:bg-violet-700"
              >
                Registrar
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
