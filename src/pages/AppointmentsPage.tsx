import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar, FiClock } from "react-icons/fi";

const AppointmentPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const API_REQUEST_URL = "http://localhost:3000/api/appointment-requests";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setRequestError(null);
    setRequestSuccess(false);

    if (!selectedDate || !selectedTime) {
      setRequestError("Por favor, selecione a data e a hora desejadas.");
      return;
    }

    const patientId = localStorage.getItem("patientId");

    if (!patientId) {
      setRequestError("Paciente não autenticado. Por favor, faça login novamente.");
      return;
    }

    try {
      const response = await fetch(API_REQUEST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          patientId: parseInt(patientId),
          date: selectedDate.toISOString(),
          time: selectedTime,
          notes,
        }),
      });

      if (response.ok) {
        setRequestSuccess(true);
      } else {
        const errorData = await response.json();
        setRequestError(errorData.error || "Falha ao solicitar consulta.");
      }
    } catch (error: any) {
      setRequestError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Solicitar Nova Consulta</h2>
          <p className="text-sm text-gray-500 mt-1">Escolha a data, hora e adicione notas se desejar.</p>
        </div>

        {/* Alerts */}
        {requestError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong className="font-bold">Erro:</strong> {requestError}
          </div>
        )}

        {requestSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <strong className="font-bold">Sucesso!</strong> Solicitação enviada.
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Data */}
            <div className="flex flex-col">
              <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-2">
                Data
              </label>
              <div className="relative">
                <DatePicker
                  id="date"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <FiCalendar className="absolute right-3 top-3 text-gray-400" size={18} />
              </div>
            </div>

            {/* Hora */}
            <div className="flex flex-col">
              <label htmlFor="time" className="text-sm font-medium text-gray-700 mb-2">
                Hora
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <FiClock className="absolute right-3 top-3 text-gray-400" size={18} />
              </div>
            </div>

            {/* Notas */}
            <div className="flex flex-col col-span-1 md:col-span-2">
              <label htmlFor="notes" className="text-sm font-medium text-gray-700 mb-2">
                Notas (Opcional)
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Botões */}
            <div className="flex items-center gap-4 col-span-1 md:col-span-2 justify-end mt-4">
              <Link
                to="/appointments"
                className="text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="inline-flex justify-center items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
