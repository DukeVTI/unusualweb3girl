import React from "react";
import { ArrowLeft, ArrowUpRight, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { RiTelegramLine } from "react-icons/ri";
import { BsMedium } from "react-icons/bs";
import { useDarkMode } from "./DarkModeContext";
import ContactForm from "./ContactForm";
import Header from "./Header";

// Content Page Component
export const ContentPage = () => {
  const { isDarkMode } = useDarkMode();

  const content = [
    {
      title: "SMM Tips and Tools",
      description:
        "Insights on managing social media accounts naturally with effective tools and platforms",
      platforms: ["Twitter", "Telegram"],
      link: "https://x.com/unusualweb3lady/status/1854105413513253205?s=46",
      impact: "Engaged community with valuable SMM strategies",
      details:
        "Shared personal experiences and recommended tools for social media management, including post schedulers (Hootsuite, Buffer), meme generators, and crypto news sources (Crypto Slate, Coin Desk). Emphasized the importance of audience understanding, knowledge of crypto, and being strategic with content to convert users.",
    },
    {
      title: "Handling Social Media Effectively",
      link: "https://x.com/unusualweb3lady/status/1855158917266894873?s=46",
      description:
        "Tips on managing trolls, staying authentic, and engaging with content strategically.",
      platforms: ["Twitter"],
      impact: "Practical advice for content creators and social media managers",
      details:
        "Shared tips for handling trolls, using humor, staying concise, and remaining transparent in social media interactions. Emphasized the importance of engaging with relevant content, staying updated with trends, and managing social media effectively as a content writer and SMM.",
    },
    {
      title: "DeFi Protocol Insights",
      link: "https://x.com/deeonlyunusual/status/1854828450399301937?s=46",
      description:
        "Exploring the latest DeFi protocols like lending, DEXs, cross-chain solutions, oracles, governance, and yield farming.",
      platforms: ["Twitter", "Telegram"],
      impact: "Engaged community sharing crypto protocol insights",
      details:
        "Highlighted key DeFi protocols enabling lending, peer-to-peer trading, blockchain interoperability, data verification, decentralized governance, and yield farming. Focused on providing valuable insights to users and investors.",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
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
                <h2 className="text-2xl font-bold text-emerald-400">
                  {item.title}
                </h2>
                <a href={item.link}>
                  <ArrowUpRight className="text-emerald-400" size={20} />
                </a>
              </div>
              <p
                className={`mb-6 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {item.description}
              </p>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                {item.details}
              </p>
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
        <div
          className={`mt-16 rounded-xl p-8 border transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-900/50 border-gray-800"
              : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-2xl font-bold mb-8">Content Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "500K+", label: "Total Views" },
              { value: "50+", label: "Tutorials Created" },
              { value: "100+", label: "Articles Published" },
              { value: "30+", label: "Project Features" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-emerald-400">
                  {stat.value}
                </div>
                <div className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                  {stat.label}
                </div>
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
      username: "@unusualweb3girl",
    },
    {
      icon: <Twitter size={24} />,
      label: "Twitter",
      href: "https://x.com/unusualweb3lady?s=21",
      username: "@Unusualweb3girl",
    },
    {
      icon: <RiTelegramLine size={24} />,
      label: "Telegram",
      href: "https://t.me/unusualdefi",
      username: "@unusualdefi",
    },
    {
      icon: <Mail size={24} />,
      label: "Email",
      href: "mailto:dupsyadeola@gmail.com",
      username: "dupsyadeola@gmail.com",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form Section */}
          <div>
            <h1 className="text-4xl font-bold mb-8">Let's Connect</h1>
            <p
              className={`mb-8 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Have a project in mind or want to collaborate? I'd love to hear
              from you. Feel free to reach out through the form or any of my
              social channels.
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
                    <div
                      className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      {link.username}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Additional Contact Info */}
            <div
              className={`mt-12 p-6 rounded-lg border transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-900/50 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3 className="font-medium mb-2">Working Hours</h3>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                Available Monday to Friday
              </p>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                9:00 AM - 6:00 PM UTC
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
