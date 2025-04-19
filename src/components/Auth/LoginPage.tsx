import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica de autenticação aqui
    console.log('Login:', { email, password });
  };

  return (
    <>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-indigo-600">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              Email
            </label>
            <div className="relative flex items-center mt-2">
            <span className="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-3 text-gray-400 dark:text-gray-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            </span>
            <input
              className="block w-full py-2.5 text-black placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-700 dark: focus:ring-blue-300 bg-indigo-700focus:outline-none focus:ring focus:ring-opacity-40"
              id="email"
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                Senha
              </label>
              <a href="/register" className="block text-xs text-gray-600 hover:underline dark:text-gray-400 hover:text-indigo-700">Esqueceu sua senha?</a>
            </div>

            <div className="relative flex items-center mt-2">
              <button className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                </svg>
              </button>

            <input
              className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:text-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-black focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="password"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
            
          </div>
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Entrar
            </button>
            <Link to="/register" className="inline-block text-sm font-semibold text-indigo-500 align-baseline hover:text-indigo-800">
              Criar conta
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginPage;