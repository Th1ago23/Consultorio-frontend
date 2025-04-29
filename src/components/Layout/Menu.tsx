import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaHistory } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiLogOut, FiSearch, FiUser } from "react-icons/fi"; // Importe FiUser

interface MenuProps {
  userName?: string; // Prop para receber o nome do usuário
}

const Menu: React.FC<MenuProps> = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col h-full p-3 bg-white dark:bg-gray-900 dark:text-white transition-all duration-300
        ${isOpen ? "w-60" : "w-16"}
        fixed md:static top-0 left-0 z-20 h-screen
      `}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          {isOpen && <h2 className="text-lg font-semibold">Menu</h2>}
          <button
            onClick={toggleMenu}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <HiMenuAlt3 className="w-6 h-6 fill-current" />
          </button>
        </div>

        {isOpen && (
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <button type="submit" className="p-1 focus:outline-none">
                <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </span>
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-full py-2 pl-10 text-sm border rounded-md focus:outline-none focus:ring dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
        )}

        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm">
              <Link
                to="/appointments"
                className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaHome className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                {isOpen && <span>Home</span>}
              </Link>
            </li>

            <li className="rounded-sm">
              <Link
                to="/consultas"
                className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <MdAssignment className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                {isOpen && <span>Consultas</span>}
              </Link>
            </li>

            <li className="rounded-sm">
              <Link
                to="/historico"
                className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaHistory className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                {isOpen && <span>Histórico</span>}
              </Link>
            </li>

            <div className="border-t pt-4 mt-4 dark:border-gray-700">
              <Link
                to="/login"
                className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <FiLogOut className="w-5 h-5" />
                {isOpen && <span>Sair</span>}
              </Link>
            </div>
          </ul>
        </div>

        {/* Nome do usuário e botão de perfil (parte inferior esquerda) */}
        <div className="absolute bottom-3 left-3">
          {isOpen && userName && (
            <div className="flex items-center space-x-2">
              <button className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
                <FiUser className="w-6 h-6 text-gray-500 dark:text-gray-400" /> {/* Ícone de usuário */}
              </button>
              <span>{userName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;