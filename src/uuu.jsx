import React, { useState, useEffect } from "react";
import { BsMedium } from "react-icons/bs";
import { Twitter, Mail } from "lucide-react";
import { useDarkMode } from "./components/DarkModeContext";

const Portfolio = () => {
  const { isDarkMode } = useDarkMode();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const socialLinks = [
    {
      icon: <BsMedium size={24} className="relative z-10" />,
      label: "Medium",
      href: "https://medium.com/@dupsyadeola/exploring-the-roles-of-cryptocurrency-in-web3-applications-89f49fc17713",
      color: "hover:bg-black",
    },
    {
      icon: <Twitter size={24} className="relative z-10" />,
      label: "Twitter",
      href: "https://x.com/unusualweb3lady?s=21",
      color: "hover:bg-blue-400",
    },
    {
      icon: <Mail size={24} className="relative z-10" />,
      label: "Email",
      href: "mailto:dupsyadeola@gmail.com",
      color: "hover:bg-red-500",
    },
  ];

  const stats = [
    {
      value: "100K+",
      label: "Social Followers",
      description: "Engaged community members across platforms",
    },
    {
      value: "200+",
      label: "Articles Published",
      description: "In-depth Web3 educational content",
    },
    {
      value: "50+",
      label: "Projects",
      description: "Successful collaborations and launches",
    },
    {
      value: "1M+",
      label: "Content Views",
      description: "Global reach and impact",
    },
  ];

  // Stat Card Component
  const StatCard = ({ stat }) => (
    <div
      className={`p-6 rounded-xl border transition-all duration-300 hover:border-emerald-400/50 ${
        isDarkMode
          ? "bg-gray-900/50 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      <div
        className={`text-3xl font-bold mb-2 ${
          isDarkMode ? "text-emerald-400" : "text-emerald-600"
        }`}
      >
        {stat.value}
      </div>
      <div className="font-medium mb-2">{stat.label}</div>
      <div
        className={`text-sm ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {stat.description}
      </div>
    </div>
  );

  // Social Link Component
  const SocialLink = ({ item }) => (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative p-4 rounded-xl border group transition-all duration-300 ${
        isDarkMode
          ? "border-gray-800 hover:border-emerald-400/50 bg-gray-900/50"
          : "border-gray-200 hover:border-emerald-600/50 bg-white"
      }`}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`relative rounded-lg overflow-hidden ${
            isDarkMode ? "text-emerald-400" : "text-emerald-600"
          }`}
        >
          {item.icon}
        </div>
        <span className="font-medium">{item.label}</span>
      </div>
    </a>
  );

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            className={`transition-all duration-700 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Hero Section */}
            <div className="max-w-3xl mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Making <span className="text-emerald-400">Web3</span> Accessible
              </h1>
              <p
                className={`text-xl md:text-2xl leading-relaxed ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Web3 content creator and community builder passionate about
                making blockchain technology understandable and accessible to
                everyone.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} />
              ))}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((item, i) => (
                <SocialLink key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;