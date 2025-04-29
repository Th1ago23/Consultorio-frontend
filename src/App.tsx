import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import Layout from "./components/Layout/Layout";
import AuthLayout from "./components/Layout/AuthLayout";
import AppointmentsLayout from "./components/Layout/AppointmentsLayout";
import AppointmentsPage from "./pages/AppointmentsPage";
import ConsultasPage from "./pages/ConsultasPage";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element = {<AppointmentsLayout/>}>
          <Route path="/appointments" element={<AppointmentsPage/>} />
          <Route path="/consultas" element={<ConsultasPage/>} />
          <Route path="/historico" element={<History/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
