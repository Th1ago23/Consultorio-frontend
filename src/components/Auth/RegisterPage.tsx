import React, { useState, useEffect } from 'react';


interface Estado {
  id: number;
  nome: string;
  sigla: string;
}

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country] = useState('Brasil');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [estados, setEstados] = useState<Estado[]>([]);

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => response.json())
      .then((data) => {
        const estadosOrdenados = data.sort((a: Estado, b: Estado) =>
          a.nome.localeCompare(b.nome)
        );
        setEstados(estadosOrdenados);
      })
      .catch((error) => console.error('Erro ao buscar estados:', error));
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica de cadastro aqui
    console.log('Cadastro:', {
      name,
      email,
      cpf,
      phone,
      birthDate,
      address,
      city,
      state,
      zipCode,
      country,
      password,
      confirmPassword,
    });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Ícone de Home */}

      <div className="w-full max-w-2xl p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-indigo-600">Cadastro</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="name">
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
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="email">
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
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="cpf">
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
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="phone">
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
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="birthDate">
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
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="address">
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
<label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="city">
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
<label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="state">
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
<label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="zipCode">
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
<label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="country">
País
</label>
<input
className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-100 border rounded"
id="country"
type="text"
value={country}
readOnly
/>
</div>

<div>
<label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="password">
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
<label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="confirmPassword">
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

<div className="col-span-1 md:col-span-2">
<button
type="submit"
className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
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

 
