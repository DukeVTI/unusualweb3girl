import React, { useState } from 'react';
import {
  Github,
  Twitter,
  Mail,
  ExternalLink,
  Menu,
  X,
  ArrowUpRight,
  Sun,
  Moon
} from 'lucide-react';

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const projects = [
    {
      title: "DeFi Yield Optimizer",
      description: "A sophisticated DeFi platform optimizing yields across multiple protocols",
      tech: ["Solidity", "React", "Web3"],
      impact: "$2.5M TVL"
    },
    {
      title: "NFT Marketplace",
      description: "Marketplace for digital collectibles with advanced trading features",
      tech: ["Next.js", "IPFS", "TypeScript"],
      impact: "10K+ Collections"
    },
    {
      title: "DAO Governance",
      description: "Decentralized governance platform for community decision-making",
      tech: ["Solidity", "TheGraph", "React"],
      impact: "50K+ Votes"
    }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-sm bg-opacity-70 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold">UW3G</span>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#projects" className="hover:text-green-500 transition-colors">Projects</a>
              <a href="#experience" className="hover:text-green-500 transition-colors">Experience</a>
              <a href="#contact" className="hover:text-green-500 transition-colors">Contact</a>
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className={`px-4 pt-2 pb-3 space-y-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <a href="#projects" className="block px-3 py-2 hover:text-green-500">Projects</a>
              <a href="#experience" className="block px-3 py-2 hover:text-green-500">Experience</a>
              <a href="#contact" className="block px-3 py-2 hover:text-green-500">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold mb-6">Building the Future of Web3</h1>
          <p className="text-xl max-w-2xl mb-8 text-gray-600 dark:text-gray-400">
            Community builder and content creator bridging the gap between Web3 projects and their audiences 
            through strategic engagement and creative storytelling.
          </p>
          <div className="flex gap-4">
            {[
              { icon: <Github size={20} />, label: "GitHub" },
              { icon: <Twitter size={20} />, label: "Twitter" },
              { icon: <Mail size={20} />, label: "Email" },
            ].map((item, i) => (
              <button
                key={i}
                className={`p-3 rounded-full border ${
                  isDarkMode 
                    ? 'border-gray-800 hover:border-gray-700' 
                    : 'border-gray-200 hover:border-gray-300'
                } transition-colors`}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <div 
                key={i}
                className={`p-6 rounded-xl border ${
                  isDarkMode 
                    ? 'border-gray-800 hover:border-gray-700' 
                    : 'border-gray-200 hover:border-gray-300'
                } transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <ArrowUpRight className="text-green-500" size={20} />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, j) => (
                    <span
                      key={j}
                      className={`px-3 py-1 text-sm rounded-full ${
                        isDarkMode 
                          ? 'bg-gray-800 text-gray-300' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-green-500 font-medium">{project.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 focus:border-green-500' 
                      : 'bg-white border-gray-200 focus:border-green-500'
                  } outline-none transition-colors`}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 focus:border-green-500' 
                      : 'bg-white border-gray-200 focus:border-green-500'
                  } outline-none transition-colors`}
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Message"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 focus:border-green-500' 
                      : 'bg-white border-gray-200 focus:border-green-500'
                  } outline-none transition-colors resize-none`}
                />
              </div>
              <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;