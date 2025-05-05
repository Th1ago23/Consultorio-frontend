import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Consulta {
  id: number;
  date: string;
  time: string;
  notes: string;
  status: string;
  patient: {
    name: string;
  };
}

const ConsultasPage: React.FC = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    async function fetchConsultas() {
      const token = localStorage.getItem('token');
      const patientId = localStorage.getItem('patientId');
      console.log("Token para listar consultas:", token);
      console.log("PatientId para listar consultas (antes da requisição):", patientId);
      try {
        const response = await axios.get("http://localhost:3000/api/appointment-requests", { // Ou a sua URL correta
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        console.log("Resposta da API (listar):", response.data);
        setConsultas(response.data);
      } catch (error) {
        console.error("Erro ao buscar consultas do paciente:", error);
        setConsultas([]);
      }
    }
    fetchConsultas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Minhas Consultas</h1>
        <Link
          to="/appointments"
          className="bg-[#800000] hover:bg-[#9E2A2B] text-white font-semibold px-4 py-2 rounded"
        >
          Criar Consulta
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultas.map((consulta) => (
          <div key={consulta.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{consulta.patient.name}</h2>
            <p className="text-gray-600 mb-1">
              <span className="font-bold">Data:</span> {new Date(consulta.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-bold">Hora:</span> {consulta.time}
            </p>
            {consulta.notes && (
              <p className="text-gray-600 mb-1">
                <span className="font-bold">Notas:</span> {consulta.notes}
              </p>
            )}
            <p className={`mt-2 text-sm font-semibold ${
              consulta.status === "PENDING" ? "text-yellow-500" :
              consulta.status === "CONFIRMED" ? "text-green-500" :
              "text-red-500"
            }`}>
              {consulta.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultasPage;