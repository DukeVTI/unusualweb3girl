import React, { useState } from "react";
import {
  Github,
  Twitter,
  Globe,
  ArrowUpRight,
  LayoutGrid,
  Code2,
  LineChart,
  Users,
  MessageCircle,
  Coffee,
  Calendar,
  BookOpen,
  Trophy,
  Send,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import Unusual from "./assets/unusual.jpeg";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("about");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState(null); // null, 'success', 'error'

  const projects = [
    {
      title: "DeFi Yield Optimizer",
      description:
        "Built a yield farming protocol that helps users maximize their returns while minimizing risk. It's like having a smart friend who knows all the best DeFi strategies! 🌱",
      tags: ["Solidity", "React", "Web3.js"],
      metrics: "TVL: $2.5M",
    },
    {
      title: "NFT Marketplace",
      description:
        "Created a fun and intuitive NFT platform where artists can truly express themselves. Think of it as Instagram meets OpenSea, but cooler! 🎨",
      tags: ["ERC-721", "IPFS", "Next.js"],
      metrics: "10K+ Collections",
    },
    {
      title: "DAO Governance",
      description:
        "Developed a governance system that makes voting as easy as liking a tweet. Because Web3 democracy should be fun and accessible! 🗳️",
      tags: ["Smart Contracts", "TheGraph", "TypeScript"],
      metrics: "50K+ Votes",
    },
  ];

  const blogPosts = [
    {
      title: "Demystifying DeFi: A Beginner's Guide",
      date: "April 2024",
      readTime: "5 min read",
      tags: ["DeFi", "Education"],
    },
    {
      title: "Smart Contract Security Best Practices",
      date: "March 2024",
      readTime: "8 min read",
      tags: ["Security", "Smart Contracts"],
    },
    {
      title: "The Future of DAOs: My Perspective",
      date: "March 2024",
      readTime: "6 min read",
      tags: ["DAO", "Web3"],
    },
  ];

  const achievements = [
    {
      title: "ETHGlobal Hackathon Winner",
      year: "2024",
      description: "First place for innovative DeFi solution",
    },
    {
      title: "Web3 Security Recognition",
      year: "2023",
      description: "Top 10 Smart Contract Auditor",
    },
    {
      title: "Community Builder Award",
      year: "2023",
      description: "Recognized for educational contributions",
    },
  ];

  const upcomingEvents = [
    {
      title: "ETHGlobal Paris",
      date: "May 15-17, 2024",
      type: "Speaker",
      topic: "Building Secure DeFi Protocols",
      location: "Paris, France",
    },
    {
      title: "Web3 Developer Workshop",
      date: "June 1, 2024",
      type: "Workshop",
      topic: "Smart Contract Development Masterclass",
      location: "Virtual",
    },
    {
      title: "DeFi Security Summit",
      date: "June 20, 2024",
      type: "Panelist",
      topic: "Future of DeFi Security",
      location: "London, UK",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle form submission logic here
      console.log("Form submitted:", formData);
      setFormStatus("success");
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setFormStatus("error");
      console.error("Form submission error:", error);
    }
  };

  const renderHeader = () => (
    <div className="w-full bg-gradient-to-r from-green-900 to-emerald-700 p-8 rounded-lg mb-8">
      <div className="max-w-4xl mx-auto text-white">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={Unusual}
            alt="UnusualWeb3Girl"
            className="rounded-full border-4 border-green-400 w-32 h-32 object-cover"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">UnusualWeb3Girl</h1>
            <p className="text-xl mb-2">Bringing Creativity to the Chain 🚀</p>
            <p className="text-emerald-200">
              Content Strategist • Community Builder • Web3 Advocate
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full font-medium transition-colors">
            <MessageCircle size={20} />
            <span>Let's Connect</span>
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full">
            <Github size={20} />
            <span>GitHub</span>
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full">
            <Twitter size={20} />
            <span>Twitter</span>
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full">
            <Globe size={20} />
            <span>Blog</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNav = () => (
    <nav className="flex justify-center gap-4 mb-8">
      {[
        { id: "about", icon: <Users size={20} />, label: "About Me" },
        { id: "projects", icon: <LayoutGrid size={20} />, label: "Projects" },
        { id: "skills", icon: <Code2 size={20} />, label: "Skills" },
        { id: "metrics", icon: <LineChart size={20} />, label: "Impact" },
        { id: "blog", icon: <BookOpen size={20} />, label: "Blog" },
        {
          id: "achievements",
          icon: <Trophy size={20} />,
          label: "Achievements",
        },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
            ${
              activeSection === item.id
                ? "bg-green-100 text-green-900"
                : "hover:bg-gray-100"
            }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );

  const renderAbout = () => (
    <div className="space-y-8">
      {/* Existing About section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Coffee size={24} className="text-green-600" />
            <h3 className="text-xl font-bold">Hey there! 👋</h3>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>
              I'm not your typical Web3 content creator. I bridge the gap
              between project founders and vibrant communities by day, and by
              night, I’m creating engaging content that resonates with the Web3
              world!
            </p>
            <p>
              With hands-on experience as a Key Opinion Leader (KOL) and
              community manager for notable projects like Bitget Africa, Green
              Dragon, and Xircus Protocol, I bring a unique blend of
              storytelling and strategic community engagement. My mission? To
              create awareness and build strong, connected communities around
              Web3 projects.
            </p>
            <p>
              When I'm not managing communities or creating content, you’ll find
              me:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Hosting Twitter Spaces to discuss Web3 trends</li>
              <li>Contributing to DAOs</li>
              <li>Engaging with Global communities in the DeFi space</li>
              <li>Exploring new ways to drive social media engagement</li>
            </ul>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Why Work With Me?</h3>
          <div className="space-y-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">🌐 Community-Driven</h4>
              <p className="text-gray-600">
                Web3 is all about connection. I understand the importance of
                fostering a loyal, engaged community and have a proven track
                record in community management with projects like Green Dragon
                and Women in DeFi.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">🎨 Creative Content Creation</h4>
              <p className="text-gray-600">
                I don’t just manage communities—I create content that resonates,
                engages, and grows audiences. From social media strategies to
                conflict resolution, I bring a thoughtful approach to every
                project.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">📈 Strategic & Focused</h4>
              <p className="text-gray-600">
                With experience across KOL, SMM, and ambassador roles, I align
                every post, tweet, and event with the project's mission. My
                goal? To help you build a strong, connected presence in the Web3
                space.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg shadow-lg border border-green-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Upcoming Events 🎯</h3>
          <button className="text-green-600 hover:text-green-700 flex items-center gap-1 text-sm">
            <span>View All Events</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Calendar size={16} />
                <span className="text-sm font-medium">{event.date}</span>
              </div>
              <h4 className="font-bold mb-2">{event.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{event.topic}</p>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin size={14} />
                <span>{event.location}</span>
              </div>
              <span className="inline-block mt-2 text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      {renderContact()}
    </div>
  );

  const renderProjects = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
        >
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{project.metrics}</span>
            <button className="hover:text-green-600 flex items-center gap-1">
              <span>View Project</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Blockchain Superpowers</h3>
        <div className="space-y-4">
          {[
            { skill: "Solidity", level: 90 },
            { skill: "Smart Contract Security", level: 85 },
            { skill: "Web3.js/Ethers.js", level: 95 },
            { skill: "DeFi Protocols", level: 88 },
            { skill: "Gas Optimization", level: 82 },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span>{item.skill}</span>
                <span>{item.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${item.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Creative Tech Stack</h3>
        <div className="space-y-4">
          {[
            { skill: "React/Next.js", level: 95 },
            { skill: "TypeScript", level: 90 },
            { skill: "TailwindCSS", level: 88 },
            { skill: "Node.js", level: 85 },
            { skill: "GraphQL", level: 80 },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span>{item.skill}</span>
                <span>{item.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${item.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMetrics = () => (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center">
        Making an Impact in Web3 🌟
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Value Locked",
            value: "$4.2M",
            change: "+15%",
            desc: "Securing assets across protocols",
          },
          {
            label: "Smart Contracts Deployed",
            value: "142",
            change: "+8",
            desc: "Battle-tested and audited",
          },
          {
            label: "GitHub Contributions",
            value: "1.2K",
            change: "+124",
            desc: "Active open source contributor",
          },
          {
            label: "Community Members",
            value: "25K",
            change: "+2.5K",
            desc: "Growing Web3 family",
          },
        ].map((metric, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h3 className="text-gray-500 text-sm mb-2">{metric.label}</h3>
            <p className="text-2xl font-bold mb-2">{metric.value}</p>
            <span className="text-green-500 text-sm block mb-2">
              {metric.change} this month
            </span>
            <p className="text-gray-600 text-sm">{metric.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBlog = () => (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center">
        Latest Blog Posts 📝
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
              <Calendar size={16} />
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h3 className="text-xl font-bold mb-3">{post.title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="text-green-600 hover:text-green-700 flex items-center gap-1">
              <span>Read More</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center">
        Achievements & Recognition 🏆
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="text-yellow-500" size={24} />
              <span className="text-gray-500">{achievement.year}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
            <p className="text-gray-600">{achievement.description}</p>
          </div>
        ))}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Certifications</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Trophy size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">Ethereum Security Specialist</p>
                <p className="text-sm text-gray-500">Consensys Academy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Trophy size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">
                  Advanced Smart Contract Development
                </p>
                <p className="text-sm text-gray-500">ChainShot</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-6">Get in Touch 📫</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <AlertCircle size={16} className="inline mr-1" />I typically respond
            within 24 hours
          </p>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Send size={18} />
            Send Message
          </button>
        </div>
      </form>
      {/* Form Submission Notifications */}
      {formStatus === "success" && (
        <div className="mt-4 bg-green-100 border border-green-400 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle size={24} className="text-green-600" />
          <span className="text-green-800">
            Thank you for your message! I'll get back to you as soon as
            possible.
          </span>
        </div>
      )}
      {formStatus === "error" && (
        <div className="mt-4 bg-red-100 border border-red-400 rounded-lg p-4 flex items-center gap-3">
          <XCircle size={24} className="text-red-600" />
          <span className="text-red-800">
            Oops, there was an error submitting your message. Please try again
            later.
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {renderNav()}
        <div className="mt-8">
          {activeSection === "about" && renderAbout()}
          {activeSection === "projects" && renderProjects()}
          {activeSection === "skills" && renderSkills()}
          {activeSection === "metrics" && renderMetrics()}
          {activeSection === "blog" && renderBlog()}
          {activeSection === "achievements" && renderAchievements()}
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
