import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useDarkMode } from "./DarkModeContext";
import { PiLinktreeLogo } from "react-icons/pi";

const ExperiencePage = () => {
  const { isDarkMode } = useDarkMode();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const experiences = [
    {
      role: "KOL",
      companies: ["BITGET AFRICA", "NAVY AI", "AXELAR"],
      description: "Content creation and knowledge leadership",
      achievements: [
        "Created educational content reaching 100K+ viewers",
        "Led community growth initiatives",
        "Developed strategic partnerships",
      ],
    },
    {
      role: "COMMUNITY MANAGER",
      companies: ["GREEN DRAGON", "ASTROARMADILOS", "XIRCUS PROTOCOL"],
      description: "Community building and engagement",
      achievements: [
        "Grew community from 5K to 25K members",
        "Organized successful NFT launches",
        "Implemented engagement strategies",
      ],
    },
    {
      role: "ASST. COMMUNITY LEAD",
      companies: ["WOMEN IN DEFI"],
      description: "Supporting and growing the DeFi community",
      achievements: [
        "Coordinated educational workshops",
        "Mentored new community members",
        "Facilitated networking events",
      ],
    },
    {
      role: "SMM",
      companies: ["AUTONOMINT", "IQ.WIKI", "IQINTERN"],
      description: "Social media strategy and management",
      achievements: [
        "Increased social media engagement by 200%",
        "Developed content calendars",
        "Managed multi-platform presence",
      ],
    },
    {
      role: "AMBASSADORS",
      companies: ["SBP", "MEME_TOKEN", "ALKIMI"],
      description: "Brand representation and advocacy",
      achievements: [
        "Represented brands at key industry events",
        "Created promotional content",
        "Built strategic partnerships",
      ],
    },
  ];

  const skills = [
    {
      category: "Content",
      items: [
        "Content Management",
        "Content Creation",
        "Technical Writing",
        "Educational Content",
      ],
    },
    {
      category: "Community",
      items: [
        "Community Building",
        "Event Management",
        "Conflict Resolution",
        "Member Engagement",
      ],
    },
    {
      category: "Leadership",
      items: [
        "Team Management",
        "Strategic Planning",
        "Project Coordination",
        "Mentoring",
      ],
    },
    {
      category: "Technical",
      items: [
        "Social Media Management",
        "Analytics",
        "Community Tools",
        "Web3 Knowledge",
      ],
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        

        <div
          className={`py-1 transition-all duration-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-4xl font-bold mb-6">Experience</h1>
          <p
            className={`text-xl mb-12 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Building and nurturing Web3 communities through content, engagement,
            and leadership.
          </p>

          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`rounded-xl p-8 border transition-all duration-300 hover:border-emerald-400/50 ${
                  isDarkMode
                    ? "bg-gray-900/50 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <h2 className="text-2xl font-bold text-emerald-400 mb-4">
                  {exp.role}
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {exp.companies.map((company, idx) => (
                      <span
                        key={idx}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          isDarkMode ? "bg-gray-950" : "bg-gray-100"
                        }`}
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                  <p
                    className={`text-lg ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {exp.description}
                  </p>
                  <ul
                    className={`list-disc pl-5 space-y-2 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Skills & Expertise</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skillGroup, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-6 border transition-all duration-300 hover:border-emerald-400/50 ${
                    isDarkMode
                      ? "bg-gray-900/50 border-gray-800"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h3 className="text-lg font-bold text-emerald-400 mb-4">
                    {skillGroup.category}
                  </h3>
                  <div className="space-y-2">
                    {skillGroup.items.map((skill, idx) => (
                      <div
                        key={idx}
                        className={`py-1 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "5+", label: "Years Experience" },
              { value: "50K+", label: "Community Members" },
              { value: "100+", label: "Projects" },
              { value: "1M+", label: "Content Reach" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl border transition-all duration-300 hover:border-emerald-400/50 ${
                  isDarkMode
                    ? "bg-gray-900/50 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="text-3xl font-bold text-emerald-400 mb-2">
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

export default ExperiencePage;
