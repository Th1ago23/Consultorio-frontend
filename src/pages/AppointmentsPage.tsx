import React, { useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const API_REQUEST_URL = "http://localhost:3000/api/appointment-requests";

  // Função para verificar se o horário é válido (entre 8h e 18h)
  const isTimeValid = (time: string) => {
    const [hour] = time.split(":").map((x) => parseInt(x, 10));
    return hour >= 8 && hour < 18; // Permite apenas entre 8h e 18h
  };

  // Definir a data mínima para o DatePicker como a data de hoje
  const minDate = new Date();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setRequestError(null);
    setRequestSuccess(false);
    setLoading(true); // Ativa o carregamento

    if (!selectedDate || !selectedTime) {
      setRequestError("Por favor, selecione a data e a hora desejadas.");
      setLoading(false);
      return;
    }

    if (!isTimeValid(selectedTime)) {
      setRequestError("Por favor, selecione um horário válido dentro do horário comercial (08:00 - 18:00).");
      setLoading(false);
      return;
    }

    const patientId = localStorage.getItem("patientId");
    const token = localStorage.getItem("token");

    if (!patientId || !token) {
      setRequestError("Paciente não autenticado ou token não encontrado. Por favor, faça login novamente.");
      setLoading(false);
      return;
    }

    setTimeout(async () => {
      try {
        const response = await fetch(API_REQUEST_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      } catch (error) {
        setRequestError("Erro ao conectar com o servidor.");
      } finally {
        setLoading(false); // Desativa o carregamento
      }
    }, 1000); // Delay de 1 segundo antes de enviar a requisição
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl">
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

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="spinner-border text-primary animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-6 transition-all duration-500">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-2">
                Data
              </label>
              <DatePicker
                id="date"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={minDate} // Define a data mínima como o dia de hoje
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#800000] transition-all duration-300"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="time" className="text-sm font-medium text-gray-700 mb-2">
                Hora
              </label>
              <input
                type="time"
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#800000] transition-all duration-300"
              />
            </div>

            <div className="flex flex-col col-span-1 md:col-span-2">
              <label htmlFor="notes" className="text-sm font-medium text-gray-700 mb-2">
                Notas (Opcional)
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#800000] transition-all duration-300"
              />
            </div>

            <div className="flex items-center gap-4 col-span-1 md:col-span-2 justify-end mt-4">
              <button
                type="submit"
                className="inline-flex justify-center items-center px-4 py-2 bg-[#800000] text-white text-sm font-medium rounded-md hover:bg-[#540B0E] focus:outline-none focus:ring-2 focus:ring-[#800000] transition-all duration-300"
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
