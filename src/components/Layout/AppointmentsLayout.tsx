import React from "react";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

const AppointmentsLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="h-screen">
          <Menu />
        </div>
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppointmentsLayout;
