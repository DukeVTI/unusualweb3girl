import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { PiLinktreeLogo } from "react-icons/pi";
import { useDarkMode } from "./DarkModeContext";

const Header = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Content", path: "/content" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('menu-button');
      if (mobileMenu && 
          !mobileMenu.contains(event.target) && 
          !menuButton.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed w-full z-50 backdrop-blur-sm border-b transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-950/80 border-gray-800"
          : "bg-white/80 border-gray-200"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-bold tracking-tight transition-colors ${
              isDarkMode 
                ? "text-emerald-400 hover:text-emerald-300"
                : "text-gray-900 hover:text-emerald-600"
            }`}
          >
            UW3G
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors ${
                  isActive(item.path)
                    ? isDarkMode 
                      ? "text-emerald-400" 
                      : "text-emerald-600"
                    : isDarkMode
                    ? "text-gray-300 hover:text-emerald-400"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <a
              href="https://linktr.ee/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center font-medium transition-colors ${
                isDarkMode
                  ? "text-gray-300 hover:text-emerald-400"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              <PiLinktreeLogo className="mr-2" size={20} />
              <span>Linktree</span>
            </a>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? "hover:bg-gray-800 text-emerald-400"
                  : "hover:bg-gray-200 text-emerald-600"
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="menu-button"
            className={`md:hidden p-2 rounded-full transition-all duration-300 ${
              isDarkMode
                ? "text-gray-300 hover:text-emerald-400 hover:bg-gray-800"
                : "text-gray-700 hover:text-emerald-600 hover:bg-gray-200"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-20 transform transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? "translate-y-0 opacity-100 pointer-events-auto" 
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`px-4 pt-2 pb-3 space-y-1 shadow-lg ${
            isDarkMode 
              ? "bg-gray-950/95 border-b border-gray-800" 
              : "bg-white/95 border-b border-gray-200"
          }`}
        >
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive(item.path)
                  ? isDarkMode
                    ? "text-emerald-400 bg-gray-800"
                    : "text-emerald-600 bg-gray-100"
                  : isDarkMode
                  ? "text-gray-300 hover:text-emerald-400 hover:bg-gray-800"
                  : "text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
              }`}
              onClick={() => setIsMenuOpen(false)}
              style={{
                transitionDelay: `${index * 50}ms`
              }}
            >
              {item.name}
            </Link>
          ))}
          
          <a
            href="https://linktr.ee/unusualweb3girl"
            target="_blank"
            rel="noopener noreferrer"
            className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? "text-gray-300 hover:text-emerald-400 hover:bg-gray-800"
                : "text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
            }`}
            onClick={() => setIsMenuOpen(false)}
            style={{
              transitionDelay: `${navigation.length * 50}ms`
            }}
          >
            <div className="flex items-center">
              <PiLinktreeLogo className="mr-2" size={20} />
              <span>Linktree</span>
            </div>
          </a>

          {/* Mobile Dark Mode Toggle */}
          <div className="px-4 py-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? "text-gray-300 hover:text-emerald-400 hover:bg-gray-800"
                  : "text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
              }`}
              style={{
                transitionDelay: `${(navigation.length + 1) * 50}ms`
              }}
            >
              <span>Toggle Theme</span>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;