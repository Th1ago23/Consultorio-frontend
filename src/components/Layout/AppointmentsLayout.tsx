import React from "react";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

interface AppointmentsLayoutProps {
  onLogout: () => void;
  userName?: string | null;
}

const AppointmentsLayout: React.FC<AppointmentsLayoutProps> = ({ onLogout, userName }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="h-screen">
        <Menu userName={userName ?? undefined} onLogout={onLogout} />
      </aside>
      <main className="flex-1 p-6 overflow-auto md:pl-60 lg:pl-60"> {/* Margem para o menu em telas médias e grandes */}
        <Outlet />
      </main>
    </div>
  );
};

export default AppointmentsLayout;