import React from "react";
import { Link } from "react-router-dom";

const History: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">History</h1>
        <p className="mb-4">Produção</p>
        <Link to="/appointments" className="text-blue-500 hover:underline">
            voltar
        </Link>
        </div>
    );
    }

export default History;