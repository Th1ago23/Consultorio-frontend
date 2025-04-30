import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface Estado {
  id: number;
  nome: string;
  sigla: string;
}

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country] = useState("Brasil");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [estados, setEstados] = useState<Estado[]>([]);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const [registrationSuccess, setRegistrationSuccess] =
    useState<boolean>(false);

  const API_REGISTER_URL = "http://localhost:3000/api/auth-patient/register";

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => response.json())
      .then((data) => {
        const estadosOrdenados = data.sort((a: Estado, b: Estado) =>
          a.nome.localeCompare(b.nome)
        );
        setEstados(estadosOrdenados);
      })
      .catch((error) => console.error("Erro ao buscar estados:", error));
  }, []);

  useEffect(() => {
    const buscarEnderecoPorCEP = async () => {
      const cepLimpo = zipCode.replace(/\D/g, "");
      if (cepLimpo.length === 8) {
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${cepLimpo}/json/`
          );
          const data = await response.json();

          if (!data.erro) {
            setAddress(data.logradouro || "");
            setCity(data.localidade || "");
            setState(data.uf || "");
          } else {
            console.warn("CEP não encontrado.");
          }
        } catch (error) {
          console.error("Erro ao buscar endereço pelo CEP:", error);
        }
      }
    };

    buscarEnderecoPorCEP();
  }, [zipCode]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setRegistrationError(null);
    setRegistrationSuccess(false);

    if (password !== confirmPassword) {
      setRegistrationError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch(API_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          cpf,
          phone,
          birthDate,
          address,
          number,
          complement,
          city,
          state,
          zipCode,
          country,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Cadastro realizado com sucesso!", data);
        setRegistrationSuccess(true);
      } else {
        const errorData = await response.json();
        console.error("Erro ao cadastrar:", errorData);
        setRegistrationError(
          `Erro no cadastro: ${errorData.error || response.statusText}`
        );
      }
    } catch (error: any) {
      console.error("Erro ao enviar requisição de cadastro:", error);
      setRegistrationError("Erro ao conectar com o servidor.");
    }
  };

  if (registrationSuccess) {
    return <Navigate to="/appointments" />;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-indigo-600">
          Cadastro
        </h2>

        {registrationError && (
          <div className="mb-4 text-red-500">{registrationError}</div>
        )}

        {registrationSuccess && (
          <div className="mb-4 text-green-500">
            Cadastro realizado com sucesso!
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              Nome
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring focus:border-indigo-500"
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring focus:border-indigo-500"
              id="email"
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="cpf"
            >
              CPF
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring focus:border-indigo-500"
              id="cpf"
              type="text"
              placeholder="Seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="phone"
            >
              Telefone
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring focus:border-indigo-500"
              id="phone"
              type="tel"
              placeholder="Seu telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="birthDate"
            >
              Data de Nascimento
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring focus:border-indigo-500"
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="zipCode"
            >
              CEP
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring focus:border-indigo-500"
              id="zipCode"
              type="text"
              placeholder="Seu CEP"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="number"
            >
              Número
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring focus:border-indigo-500"
              id="number"
              type="text"
              placeholder="Número da residência"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="complement"
            >
              Complemento
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring focus:border-indigo-500"
              id="complement"
              type="text"
              placeholder="Complemento (opcional) Ex: Apto 101"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="address"
            >
              Endereço
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring focus:border-indigo-500"
              id="address"
              type="text"
              placeholder="Seu endereço"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="city"
            >
              Cidade
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring focus:border-indigo-500"
              id="city"
              type="text"
              placeholder="Sua cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="state"
            >
              Estado
            </label>
            <select
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-indigo-500"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="">Selecione o estado</option>
              {estados.map((estado) => (
                <option key={estado.id} value={estado.sigla}>
                  {estado.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="country"
            >
              País
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-100 border rounded focus:outline-none"
              id="country"
              type="text"
              value={country}
              disabled
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring focus:border-indigo-500"
              id="password"
              type="password"
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="confirmPassword"
            >
              Confirmar Senha
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring focus:border-indigo-500"
              id="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
              type="submit"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
