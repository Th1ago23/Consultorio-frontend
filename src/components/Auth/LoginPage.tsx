import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode"; // Certifique-se de instalar a biblioteca jwt-decode

interface DecodedToken extends JwtPayload {
  patientId?: number;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_LOGIN_URL = "http://localhost:3000/api/auth-patient/login"; // Ajuste a URL se necessário

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError(null);

    try {
      const response = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login bem-sucedido:", data);
        localStorage.setItem("token", data.token); // Armazena o token

        // Decodifique o token para obter o patientId
        try {
          const decodedToken = jwtDecode<DecodedToken>(data.token);
          console.log("Decoded Token:", decodedToken); // Adicionado log do token decodificado
          if (decodedToken?.patientId !== undefined) {
            localStorage.setItem("patientId", decodedToken.patientId.toString());
            console.log("PatientId salvo no localStorage:", decodedToken.patientId); // Adicionado log do patientId salvo
            navigate("/appointments"); // Redireciona para a página desejada após o login
          } else {
            console.error("Token não contém patientId:", decodedToken);
            setLoginError("Erro interno ao processar o login: patientId ausente no token.");
          }
        } catch (decodeError) {
          console.error("Erro ao decodificar o token:", decodeError);
          setLoginError("Erro interno ao processar o login.");
        }
      } else {
        const errorData = await response.json();
        console.error("Erro no login:", errorData);
        setLoginError(errorData.error || "Falha ao fazer login. Verifique suas credenciais.");
      }
    } catch (error: any) {
      console.error("Erro ao enviar requisição de login:", error);
      setLoginError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-center text-[#800000]">
            Login
          </h2>
          {loginError && (
            <div className="mb-4 text-red-500">{loginError}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative flex items-center mt-2">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mx-3 text-gray-400 dark:text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                <input
                  className="block w-full py-2.5 text-black placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:text-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-black focus:ring-[#800000] bg-indigo-700focus:outline-none focus:ring focus:ring-opacity-40"
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
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  Senha
                </label>
              </div>

              <div className="relative flex items-center mt-2">
                <input
                  className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:text-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-black focus:ring-[#800000] focus:outline-none focus:ring focus:ring-opacity-40"
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
                type="submit"
                className="px-4 py-2 font-bold text-white bg-[#800000] rounded hover:bg-[#9E2A2B] focus:outline-none focus:shadow-outline"
              >
                Entrar
              </button>
              <Link
                to="/register"
                className="inline-block text-sm font-semibold text-[#800000] align-baseline hover:text-[#9E2A2B]"
              >
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