import React from "react";
import { Outlet } from "react-router-dom";
import LoginRegisterHeader from "./LoginRegisterHeader";

const AuthLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LoginRegisterHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
