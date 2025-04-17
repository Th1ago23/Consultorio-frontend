import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12">
      <section className="bg-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">
            Cuidado e Bem-Estar para Você e Sua Família
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Um espaço dedicado à saúde e ao acolhimento, com profissionais qualificados e atendimento humanizado.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-md">
            Agendar Consulta
          </button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">Consultas Clínicas</h3>
              <p className="text-gray-700">Avaliação completa e acompanhamento da sua saúde.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">Exames e Diagnósticos</h3>
              <p className="text-gray-700">Realização de exames para um diagnóstico preciso.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">Aconselhamento e Orientação</h3>
              <p className="text-gray-700">Suporte e informações para suas decisões de saúde.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Sobre Nós</h2>
          <p className="text-lg text-gray-600 mb-6">
            O consultório da Dra. [Nome da sua mãe] oferece um ambiente acolhedor e profissional, focado no bem-estar dos pacientes.
            Com anos de experiência e dedicação à saúde, buscamos proporcionar um atendimento de excelência e confiança.
          </p>

          <p className="text-gray-500">Dra. [Nome da sua mãe], [Especialidade]</p>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Agende sua Consulta</h2>
          <p className="text-lg text-gray-600 mb-6">
            Entre em contato conosco para marcar sua consulta ou obter mais informações.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="tel:[Número de Telefone]" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-md">
              Ligar
            </a>
            <a href="mailto:[Email do Consultório]" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md">
              Enviar Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;