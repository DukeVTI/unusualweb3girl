import React from 'react';
import { ArrowLeft, ArrowUpRight, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RiTelegramLine } from 'react-icons/ri';
import { BsMedium } from 'react-icons/bs';
import { useDarkMode } from './DarkModeContext';
import ContactForm from './ContactForm';
import Header from './Header';

// Content Page Component
export const ContentPage = () => {
  const { isDarkMode } = useDarkMode();
  
  const content = [
    {
      title: "Web3 Educational Series",
      description: "Breaking down complex DeFi concepts into digestible content for newcomers",
      platforms: ["YouTube", "Medium", "Twitter"],
      impact: "500K+ Views",
      details: "Created comprehensive guides and tutorials on DeFi protocols, yield farming strategies, and blockchain fundamentals. Specialized in making complex topics accessible to beginners."
    },
    {
      title: "NFT Community Management",
      description: "Built and managed a thriving NFT community from launch to successful mint",
      platforms: ["Discord", "Twitter", "Telegram"],
      impact: "25K+ Members",
      details: "Developed engagement strategies, moderated community channels, and coordinated successful NFT launches. Created educational content about NFT technology and market trends."
    },
    {
      title: "DeFi Weekly Newsletter",
      description: "Curated insights on the latest DeFi trends, protocols, and opportunities",
      platforms: ["Substack", "Twitter", "Telegram"],
      impact: "15K+ Subscribers",
      details: "Analyzed emerging DeFi protocols, provided market insights, and highlighted investment opportunities. Built a dedicated reader base through consistent, high-quality content."
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Portfolio
        </Link>

        <h1 className="text-4xl font-bold mb-12">Featured Content</h1>

        <div className="space-y-8">
          {content.map((item, i) => (
            <div 
              key={i}
              className={`rounded-xl p-8 border transition-all duration-300 hover:border-emerald-400/50 ${
                isDarkMode 
                  ? "bg-gray-900/50 border-gray-800" 
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-emerald-400">{item.title}</h2>
                <ArrowUpRight className="text-emerald-400" size={20} />
              </div>
              <p className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{item.description}</p>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>{item.details}</p>
              <div className="flex flex-wrap gap-3 mb-4">
                {item.platforms.map((platform, j) => (
                  <span
                    key={j}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      isDarkMode ? "bg-gray-950" : "bg-gray-100"
                    }`}
                  >
                    {platform}
                  </span>
                ))}
              </div>
              <p className="text-emerald-400 font-medium">{item.impact}</p>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className={`mt-16 rounded-xl p-8 border transition-all duration-300 ${
          isDarkMode 
            ? "bg-gray-900/50 border-gray-800" 
            : "bg-white border-gray-200"
        }`}>
          <h2 className="text-2xl font-bold mb-8">Content Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "500K+", label: "Total Views" },
              { value: "50+", label: "Tutorials Created" },
              { value: "100+", label: "Articles Published" },
              { value: "30+", label: "Project Features" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-emerald-400">{stat.value}</div>
                <div className={isDarkMode ? "text-gray-400" : "text-gray-600"}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
export const ContactPage = () => {
  const { isDarkMode } = useDarkMode();

  const socialLinks = [
    { 
      icon: <BsMedium size={24} />,
      label: "Medium",
      href: "https://medium.com/@dupsyadeola/exploring-the-roles-of-cryptocurrency-in-web3-applications-89f49fc17713",
      username: "@unusualweb3girl"
    },
    { 
      icon: <Twitter size={24} />,
      label: "Twitter",
      href: "https://x.com/unusualweb3lady?s=21",
      username: "@Unusualweb3girl"
    },
    { 
      icon: <RiTelegramLine size={24} />,
      label: "Telegram",
      href: "https://t.me/unusualdefi",
      username: "@unusualdefi"
    },
    { 
      icon: <Mail size={24} />,
      label: "Email",
      href: "mailto:dupsyadeola@gmail.com",
      username: "dupsyadeola@gmail.com"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form Section */}
          <div>
            <h1 className="text-4xl font-bold mb-8">Let's Connect</h1>
            <p className={`mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Have a project in mind or want to collaborate? I'd love to hear from you. 
              Feel free to reach out through the form or any of my social channels.
            </p>
            <ContactForm />
          </div>

          {/* Social Links Section */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Connect on Social</h2>
            <div className="space-y-6">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className={`flex items-center p-4 rounded-lg border transition-all duration-300 hover:border-emerald-400/50 ${
                    isDarkMode 
                      ? "bg-gray-900/50 border-gray-800" 
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="p-3 rounded-full bg-emerald-400/10 text-emerald-400 mr-4">
                    {link.icon}
                  </div>
                  <div>
                    <div className="font-medium">{link.label}</div>
                    <div className={isDarkMode ? "text-gray-400" : "text-gray-600"}>{link.username}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Additional Contact Info */}
            <div className={`mt-12 p-6 rounded-lg border transition-all duration-300 ${
              isDarkMode 
                ? "bg-gray-900/50 border-gray-800" 
                : "bg-white border-gray-200"
            }`}>
              <h3 className="font-medium mb-2">Working Hours</h3>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Available Monday to Friday</p>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>9:00 AM - 6:00 PM UTC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};