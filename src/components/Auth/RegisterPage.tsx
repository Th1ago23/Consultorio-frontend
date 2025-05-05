import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const API_REGISTER_URL = "http://localhost:3000/api/auth-patient/register";
  const API_LOGIN_URL = "http://localhost:3000/api/auth-patient/login";
  
  useEffect(() => {
    // Redirecionar se o usuário já estiver autenticado
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Usuário já autenticado. Redirecionando para /appointments");
      navigate("/appointments");
    }
  }, [navigate]);
  
  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => response.json())
      .then((data) => {
        console.log("Estados recebidos do IBGE:", data);
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
          const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
          const data = await response.json();
          console.log("Dados do endereço pelo CEP:", data);
  
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
  
  const validateFields = () => {
    const errors: { [key: string]: string } = {};
  
    if (!name.trim()) errors.name = "Nome é obrigatório.";
    if (!email.trim()) {
      errors.email = "Email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email inválido.";
    }
    if (!cpf.trim()) {
      errors.cpf = "CPF é obrigatório.";
    } else if (!/^\d{11}$/.test(cpf.replace(/\D/g, ""))) {
      errors.cpf = "CPF deve conter 11 dígitos numéricos.";
    }
    if (!phone.trim()) {
      errors.phone = "Telefone é obrigatório.";
    } else if (!/^\d{10,11}$/.test(phone.replace(/\D/g, ""))) {
      errors.phone = "Telefone inválido.";
    }
    if (!birthDate.trim()) errors.birthDate = "Data de nascimento é obrigatória.";
    if (!zipCode.trim()) errors.zipCode = "CEP é obrigatório.";
    if (!number.trim()) errors.number = "Número é obrigatório.";
    if (!address.trim()) errors.address = "Endereço é obrigatório.";
    if (!city.trim()) errors.city = "Cidade é obrigatória.";
    if (!state.trim()) errors.state = "Estado é obrigatório.";
    if (!password) {
      errors.password = "Senha é obrigatória.";
    } else if (password.length < 6) {
      errors.password = "A senha deve ter pelo menos 6 caracteres.";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirmação de senha é obrigatória.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem.";
    }
  
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setRegistrationError(null);
    setRegistrationSuccess(false);
  
    if (!validateFields()) {
      return;
    }
  
    try {
      // Log dos dados de cadastro
      console.log("Enviando dados para cadastro:", {
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
      });
  
      const registerResponse = await fetch(API_REGISTER_URL, {
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
  
      console.log("Resposta do cadastro:", registerResponse.status);
  
      if (registerResponse.ok) {
        setRegistrationSuccess(true);
  
        const loginResponse = await fetch(API_LOGIN_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          localStorage.setItem("token", loginData.token);
  
          // Redireciona apenas após garantir que o token foi armazenado
          const token = localStorage.getItem("token");
          if (token) {
            navigate("/appointments");
          } else {
            console.error("Token não encontrado após login.");
            setRegistrationError("Erro ao armazenar o token.");
          }
        } else {
          const loginErrorData = await loginResponse.json();
          setRegistrationError(`Cadastro feito, mas erro ao fazer login automático: ${loginErrorData.error || loginResponse.statusText}`);
        }
      } else {
        const errorData = await registerResponse.json();
        setRegistrationError(`Erro no cadastro: ${errorData.error || registerResponse.statusText}`);
      }
    } catch (error: any) {
      console.error("Erro ao registrar ou logar:", error);
      setRegistrationError("Erro ao conectar com o servidor.");
    }
  };
  
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-[#972121]">Cadastro</h2>

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
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring ${fieldErrors.name ? 'border-red-500' : 'focus:border-[#972121]'}`}
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {fieldErrors.name && <p className="text-red-500 text-sm">{fieldErrors.name}</p>}
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring ${fieldErrors.email ? 'border-red-500' : 'focus:border-[#972121]'}`}
              id="email"
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="cpf"
            >
              CPF
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring ${fieldErrors.cpf ? 'border-red-500' : 'focus:border-[#972121]'}`}
              id="cpf"
              type="text"
              placeholder="Seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            {fieldErrors.cpf && <p className="text-red-500 text-sm">{fieldErrors.cpf}</p>}
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="phone"
            >
              Telefone
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border
::contentReference[oaicite:12]{index=12}               rounded focus:outline-none focus:ring ${fieldErrors.phone ? 'border-red-500' : 'focus:border-[#972121]'}`}
              id="phone"
              type="text"
              placeholder="Seu telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {fieldErrors.phone && <p className="text-red-500 text-sm">{fieldErrors.phone}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="birthDate">
              Data de Nascimento
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring ${fieldErrors.birthDate ? 'border-red-500' : 'focus:border-[#972121]'}`}
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
            {fieldErrors.birthDate && <p className="text-red-500 text-sm">{fieldErrors.birthDate}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="zipCode">
              CEP
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring ${fieldErrors.zipCode ? 'border-red-500' : 'focus:border-[#972121]'}`}
              id="zipCode"
              type="text"
              placeholder="CEP"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            {fieldErrors.zipCode && <p className="text-red-500 text-sm">{fieldErrors.zipCode}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="address">
              Endereço
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring ${fieldErrors.address ? 'border-red-500' : 'focus:border-[#972121]'}`}
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {fieldErrors.address && <p className="text-red-500 text-sm">{fieldErrors.address}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="number">
              Número
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring ${fieldErrors.number ? 'border-red-500' : 'focus:border-[#972121]'}`}
              id="number"
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            {fieldErrors.number && <p className="text-red-500 text-sm">{fieldErrors.number}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="complement">
              Complemento
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring focus:border-[#972121]"
              id="complement"
              type="text"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="city">
              Cidade
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring ${fieldErrors.city ? 'border-red-500' : 'focus:border-[#972121]'}`}
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {fieldErrors.city && <p className="text-red-500 text-sm">{fieldErrors.city}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="state">
              Estado
            </label>
            <select
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring ${fieldErrors.state ? 'border-red-500' : 'focus:border-[#972121]'}`}
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Selecione o estado</option>
              {estados.map((estado) => (
                <option key={estado.id} value={estado.sigla}>
                  {estado.nome}
                </option>
              ))}
            </select>
            {fieldErrors.state && <p className="text-red-500 text-sm">{fieldErrors.state}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="password">
              Senha
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring ${fieldErrors.password ? 'border-red-500' : 'focus:border-[#972121]'}`}
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="confirmPassword">
              Confirmar Senha
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:ring ${fieldErrors.confirmPassword ? 'border-red-500' : 'focus:border-[#972121]'}`}
              id="confirmPassword"
              type="password"
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {fieldErrors.confirmPassword && <p className="text-red-500 text-sm">{fieldErrors.confirmPassword}</p>}
          </div>

          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-[#972121] rounded hover:bg-[#7c1b1b] transition"
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

 
