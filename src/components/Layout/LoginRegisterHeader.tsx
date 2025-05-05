import React, { useState } from "react";

const LoginRegisterHeader: React.FC = () => {

  return (
    <header className="p-4 transition-colors duration-300 bg-white shadow-md dark:bg-[#540B0E] dark:text-white">
      <div className="container flex items-center justify-between h-16 mx-auto">
        <a
          href="/"
          aria-label="Back to homepage"
          className="flex items-center -mt-2 space-x-2 transition-transform duration-300 hover:scale-105"
        >
          <img
            src="/Dra. Tatiane.png"
            alt="Logo Dra. Tatiane"
            style={{ width: "150px", height: "auto" }}
          />
        </a>


        {/* Mobile Menu Button */}
      </div>

    </header>
  );
};

export default LoginRegisterHeader;
