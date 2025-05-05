import React, { useState } from "react";
 import { Link, useNavigate } from "react-router-dom"; // Importe useNavigate
 import { FaHome} from "react-icons/fa";
 import { MdAssignment } from "react-icons/md";
 import { HiMenuAlt3 } from "react-icons/hi";
 import { FiLogOut } from "react-icons/fi"; // Importe FiUser

 interface MenuProps {
  userName?: string; // Prop para receber o nome do usuário
  onLogout: () => void; // Prop para a função de logout
 }

 const Menu: React.FC<MenuProps> = ({onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); // Inicialize useNavigate

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    onLogout(); // Chama a função de logout passada como prop
    navigate("/login"); // Redireciona para a página de login
  };

  return (
<div
  className={`flex flex-col p-3 bg-white dark:bg-black dark:text-white transition-all duration-300
    ${isOpen ? "w-60" : "w-16"}
    fixed top-0 left-0 z-20 h-screen`}
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


            <div className="border-t pt-4 mt-4 dark:border-gray-700">
              <button // Mudado para button para usar onClick
                onClick={handleLogoutClick} // Adiciona o handler de clique
                className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <FiLogOut className="w-5 h-5" />
                {isOpen && <span>Sair</span>}
              </button>
            </div>
          </ul>
        </div>

        
      </div>
    </div>
  );
};

export default Menu;