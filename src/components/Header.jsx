import React from "react";
import "./Header.css";
import 'animate.css';
const Header = () => {
  return (
    <div className="flex justify-between items-center p-5 bg-gray-100 animate-fadeIn">
      <div className="animate__animated animate__bounce text-2xl font-bold transition-transform duration-500 hover:scale-110">
        <h1>Unusual.</h1>
      </div>
      <div className="flex space-x-6">
        <a
          href="#"
          className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 transition-transform duration-500 hover:scale-110"
        >
          Services
        </a>
        <a
          href="#"
          className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 transition-transform duration-500 hover:scale-110"
        >
          About
        </a>
        <a
          href="#"
          className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 transition-transform duration-500 hover:scale-110"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
};

export default Header;
