import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50">
      <section className="dark:bg-gray-100 dark:text-gray-800">
  <div className="container flex flex-col-reverse justify-center px-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
    {/* Texto */}
    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-xl xl:max-w-2xl lg:text-left">
      <h1 className="text-4xl font-extrabold leading-tight text-indigo-700 sm:text-5xl">
        Cuidado e Bem-Estar <br />
        <span className="text-gray-800">para Você e Sua Família</span>
      </h1>
      <p className="mt-6 mb-8 text-lg text-gray-600 sm:mb-12">
        Um espaço dedicado à saúde e ao acolhimento, com profissionais qualificados e atendimento humanizado.
      </p>
      <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
        <a
          href="#"
          className="px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700"
        >
          Agendar Consulta
        </a>
        <a
          href="#"
          className="px-8 py-3 text-lg font-semibold text-indigo-600 border border-indigo-500 rounded-full hover:bg-indigo-50"
        >
          Fale Conosco
        </a>
      </div>
    </div>

    {/* Imagem */}
    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-[32rem] 2xl:h-[36rem]">
      <img
        src="assets/svg/healthcare.svg"
        alt="Cuidado e Saúde"
        className="object-contain h-full"
      />
    </div>
  </div>
</section>


      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-3xl font-semibold text-gray-800">Nossos Serviços</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-2 text-xl font-semibold text-indigo-600">Consultas Clínicas</h3>
              <p className="text-gray-700">Avaliação completa e acompanhamento da sua saúde.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-2 text-xl font-semibold text-indigo-600">Exames e Diagnósticos</h3>
              <p className="text-gray-700">Realização de exames para um diagnóstico preciso.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-2 text-xl font-semibold text-indigo-600">Aconselhamento e Orientação</h3>
              <p className="text-gray-700">Suporte e informações para suas decisões de saúde.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-3xl font-semibold text-gray-800">Sobre Nós</h2>
          <p className="mb-6 text-lg text-gray-600">
            O consultório da Dra. [Nome da sua mãe] oferece um ambiente acolhedor e profissional, focado no bem-estar dos pacientes.
            Com anos de experiência e dedicação à saúde, buscamos proporcionar um atendimento de excelência e confiança.
          </p>

          <p className="text-gray-500">Dra. [Nome da sua mãe], [Especialidade]</p>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-3xl font-semibold text-gray-800">Agende sua Consulta</h2>
          <p className="mb-6 text-lg text-gray-600">
            Entre em contato conosco para marcar sua consulta ou obter mais informações.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="tel:[Número de Telefone]" className="px-6 py-3 font-semibold text-white bg-green-500 rounded-full shadow-md hover:bg-green-600">
              Ligar
            </a>
            <a href="mailto:[Email do Consultório]" className="px-6 py-3 font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600">
              Enviar Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;