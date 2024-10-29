import React from "react";
import './Header.css'; // For animations or custom styling if needed
import unusual from "./unusual.jpeg"

const Headi = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <img
        src={unusual} // replace with profile image link or static asset
        alt="UnusualWeb3Girl"
        className="rounded-full w-32 h-32 mb-4"
      />
      <h1 className="text-4xl font-bold">UnusualWeb3Girl</h1>
      <p className="mt-2 text-xl">Content Writer | Crypto Enthusiast</p>
      <nav className="flex space-x-8 mt-6">
        <a href="#skills" className="hover:text-green-400">Skills</a>
        <a href="#experience" className="hover:text-green-400">Experience</a>
        <a href="#contact" className="hover:text-green-400">Contact</a>
      </nav>
    </div>
  );
};

export default Headi;
