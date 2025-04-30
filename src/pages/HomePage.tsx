import React from "react";
import {
  Stethoscope,
  Microscope,
  HeartHandshake,
  Laugh,
  ShieldCheck,
  Smile,
} from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div>
      <section className="dark:bg-gray-100 dark:text-gray-800">
        <div className="container flex flex-col-reverse justify-center px-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          {/* Texto */}
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-xl xl:max-w-2xl lg:text-left">
            <h1 className="text-4xl font-extrabold leading-tight text-cyan-500 sm:text-5xl">
              Cuidado e Bem-Estar <br />
              <span className="text-gray-800">para Você e Sua Família</span>
            </h1>
            <p className="mt-6 mb-8 text-lg text-gray-600 sm:mb-12">
              Um espaço dedicado à saúde e ao acolhimento, com profissionais
              qualificados e atendimento humanizado.
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <a
                href="/login"
                className="px-8 py-3 text-lg font-semibold text-white bg-cyan-600 rounded-full shadow-md hover:bg-cyan-800"
              >
                Agendar Consulta
              </a>
              <a
                href="#"
                className="px-8 py-3 text-lg font-semibold text-cyan-700 border border-cyan-700 rounded-full hover:bg-cyan-700 hover:text-white"
              >
                Fale Conosco
              </a>
            </div>
          </div>

          {/* Imagem */}
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-[32rem] 2xl:h-[36rem]">
            <img
              src="/Foto 1.png"
              alt="Cuidado e Saúde"
              className="object-cover h-full shadow-2xl rounded-l-[2rem] hidden lg:block"
            />
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container px-6 mx-auto text-center">
          <h2 className="mb-12 text-3xl font-bold text-gray-800">
            Nossos Serviços
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Serviço 1 */}
            <div className="p-6 text-left transition-shadow bg-white shadow-lg rounded-2xl hover:shadow-xl">
              <div className="flex items-center mb-4 text-cyan-700">
                <Stethoscope className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">Consultas Clínicas</h3>
              </div>
              <p className="text-gray-600">
                Avaliação completa e acompanhamento da sua saúde.
              </p>
            </div>

            {/* Serviço 2 */}
            <div className="p-6 text-left transition-shadow bg-white shadow-lg rounded-2xl hover:shadow-xl">
              <div className="flex items-center mb-4 text-cyan-700">
                <Microscope className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">Exames e Diagnósticos</h3>
              </div>
              <p className="text-gray-600">
                Realização de exames para um diagnóstico preciso.
              </p>
            </div>

            {/* Serviço 3 */}
            <div className="p-6 text-left transition-shadow bg-white shadow-lg rounded-2xl hover:shadow-xl">
              <div className="flex items-center mb-4 text-cyan-700">
                <HeartHandshake className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">Aconselhamento</h3>
              </div>
              <p className="text-gray-600">
                Suporte e informações para suas decisões de saúde.
              </p>
            </div>

            {/* Serviço 4 */}
            <div className="p-6 text-left transition-shadow bg-white shadow-lg rounded-2xl hover:shadow-xl">
              <div className="flex items-center mb-4 text-cyan-700">
                <Laugh className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">Implantes Dentários</h3>
              </div>
              <p className="text-gray-600">
                Realização de sonhos através de implantes.
              </p>
            </div>

            {/* Serviço 5 */}
            <div className="p-6 text-left transition-shadow bg-white shadow-lg rounded-2xl hover:shadow-xl">
              <div className="flex items-center mb-4 text-cyan-700">
                <ShieldCheck className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">Prevenção</h3>
              </div>
              <p className="text-gray-600">
                Cuidados preventivos para manter a saúde em dia.
              </p>
            </div>

            {/* Serviço 6 */}
            <div className="p-6 text-left transition-shadow bg-white shadow-lg rounded-2xl hover:shadow-xl">
              <div className="flex items-center mb-4 text-cyan-700">
                <Smile className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">Saúde Estética</h3>
              </div>
              <p className="text-gray-600">
                Procedimentos voltados ao bem-estar e autoestima.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-3xl font-semibold text-gray-800">
            Sobre Nós
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            O consultório da Dra. Tatiane da Silva Peixoto oferece um ambiente
            acolhedor e profissional, focado no bem-estar dos pacientes. Com
            anos de experiência e dedicação à saúde, buscamos proporcionar um
            atendimento de excelência e confiança.
          </p>

          <p className="text-gray-500">
            Dra. Tatiane Peixoto, Cirurgiâ Dentista
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
