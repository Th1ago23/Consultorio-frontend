import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 text-center text-gray-600 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-2">
          TP Odontologia &copy; {new Date().getFullYear()} - Todos os direitos reservados.
        </p>
        <nav className="flex justify-center space-x-4 mb-4">
          <Link to="/politica-privacidade" className="text-gray-500 hover:text-indigo-500">
            Política de Privacidade
          </Link>
          <Link to="/termos-de-uso" className="text-gray-500 hover:text-indigo-500">
            Termos de Uso
          </Link>
        </nav>
        <p className="text-sm text-gray-500">
          Distrito - R. Pres. Costa e Silva, 526 - Califórnia, Barra do Piraí - RJ - 27163-000
        </p>
      </div>
    </footer>
  );
};

export default Footer;