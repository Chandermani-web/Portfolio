import React, { useState } from "react";
import { 
  Globe, 
  Trophy, 
  Activity, 
  TrendingUp,
  ExternalLink, 
  Github, 
  Code2,
  Database,
  Cpu,
  Layers,
  Users,
  CheckCircle2,
  Clock,
} from "lucide-react";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState("frontend");

  const projectsData = [
    {
      id: "lingolive",
      status: "Ongoing",
      title: "Lingolive",
      subtitle: "Real-Time Multilingual Voice Communication",
      image: "/Project-images/pexels-pixabay-41949.jpg",
      shortDescription: "A real-time voice communication platform that enables users to talk in different languages using speech-to-text, translation, and voice synthesis.",
      fullDescription: "Lingolive is an ongoing full-stack project focused on breaking language barriers in real-time voice communication. The system captures live audio, converts speech to text using Whisper, translates it into the target language, and streams the output back with minimal latency using WebSockets.",
      responsibilities: {
        frontend: [
          "Built responsive UI using React and Tailwind CSS",
          "Implemented real-time conversation UI with Socket.io client",
          "Managed application state using Context API",
          "Handled live audio interaction states and feedback UI",
        ],
        backend: [
          "Designed REST APIs using Node.js and Express",
          "Implemented WebSocket-based real-time communication",
          "Integrated Whisper for speech-to-text processing",
          "Handled translation pipeline and request orchestration",
        ],
        database: [
          "Designed MongoDB schemas for users and chat sessions",
          "Stored conversation metadata and history",
        ],
        ai: [
          "Integrated Whisper for speech recognition",
          "Worked on optimizing latency in real-time AI pipelines",
        ],
      },
      techStack: {
        frontend: ["React", "TailwindCSS", "Context API"],
        backend: ["Node.js", "Express.js", "Socket.io"],
        database: ["MongoDB"],
        ai: ["Python", "Whisper"],
        other: ["Cloudinary"],
      },
      links: {
        live: "https://lingolive.onrender.com",
        github: "https://github.com/Chandermani-web/lingolive",
      },
    },
    {
      id: "aicte-ugc",
      status: "Completed",
      title: "AI Automation for UGC–AICTE",
      subtitle: "Smart India Hackathon Project",
      image: "/Project-images/pexels-canvastudio-3194519.jpg",
      shortDescription: "A web platform to automate and digitize academic approval workflows for UGC and AICTE.",
      fullDescription: "This project was developed during Smart India Hackathon to streamline academic regulation workflows. The system enables role-based access, document validation, workflow tracking, and analytics dashboards for institutions and authorities.",
      responsibilities: {
        frontend: [
          "Built role-based dashboards using React and Tailwind CSS",
          "Implemented data visualization using Chart.js",
          "Designed reusable UI components for workflow tracking",
        ],
        backend: [
          "Developed REST APIs using Node.js and Express",
          "Implemented role-based access control",
          "Handled document workflow logic and validations",
        ],
        database: [
          "Designed MongoDB schemas for institutions, users, and documents",
          "Managed structured academic data and workflow states",
        ],
        ai: [
          "Integrated AI models for document validation and analysis",
          "Worked with YOLO and Whisper for automation pipelines",
        ],
      },
      techStack: {
        frontend: ["React", "TailwindCSS", "Chart.js"],
        backend: ["Node.js", "Express.js"],
        database: ["MongoDB"],
        ai: ["Python", "YOLO", "Whisper"],
        other: ["Cloudinary", "Socket.io"],
      },
      links: {
        live: null,
        github: "https://github.com/Chandermani-web/edu-regulation-automation-platform",
      },
    },
    {
      id: "c72",
      status: "Completed",
      title: "C72 – Clinic Management System",
      subtitle: "Healthcare Management Platform",
      image: "/Project-images/pexels-tima-miroshnichenko-6011598.jpg",
      shortDescription: "A full-stack clinic management system for handling appointments, patient records, and dashboards.",
      fullDescription: "C72 is a healthcare management platform designed to manage patients, appointments, and clinic operations. The system focuses on clean UI, structured data handling, and role-based dashboards.",
      responsibilities: {
        frontend: [
          "Built responsive dashboards using React and Tailwind CSS",
          "Implemented charts and reports using Chart.js",
          "Handled state management for patient and appointment data",
        ],
        backend: [
          "Designed backend logic for appointments and records",
          "Integrated Firebase authentication",
        ],
        database: [
          "Used Firebase Firestore for real-time data storage",
          "Designed collections for patients and appointments",
        ],
      },
      techStack: {
        frontend: ["React", "TailwindCSS", "Chart.js", "Redux"],
        backend: ["Firebase"],
        database: ["Firestore"],
      },
      links: {
        live: "https://cliniccare124501.netlify.app/",
        github: "https://github.com/Chandermani-web/Clinic-Management-System",
      },
    },
    {
      id: "wealthwisdom",
      status: "Completed",
      title: "WealthWisdom",
      subtitle: "Personal Finance & Investment Tracker",
      image: "/Project-images/pexels-alesiakozik-6772076.jpg",
      shortDescription: "A financial dashboard for tracking investments, savings, and market data.",
      fullDescription: "WealthWisdom is a web-based financial platform that allows users to track investments, view market trends, and analyze assets using real-time APIs.",
      responsibilities: {
        frontend: [
          "Designed UI for portfolio and asset tracking",
          "Integrated charts and financial visualizations",
        ],
        backend: [
          "Connected third-party financial APIs",
          "Handled data aggregation logic",
        ],
        database: [
          "Stored user financial data using Firebase",
        ],
      },
      techStack: {
        frontend: ["React", "CSS"],
        backend: ["Firebase"],
        database: ["Firebase"],
        other: ["Google APIs"],
      },
      links: {
        live: null,
        github: "https://github.com/Chandermani-web/Hackathon-wealthwisdom",
      },
    },
  ];

  const projectIcons = {
    lingolive: Globe,
    "aicte-ugc": Trophy,
    c72: Activity,
    wealthwisdom: TrendingUp,
  };

  const responsibilityTabs = [
    { id: "frontend", label: "Frontend", icon: Layers },
    { id: "backend", label: "Backend", icon: Cpu },
    { id: "database", label: "Database", icon: Database },
    { id: "ai", label: "AI/ML", icon: Code2 },
  ];

  const StatusBadge = ({ status }) => {
    if (status === "Ongoing") {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
          <Clock className="w-3.5 h-3.5" />
          {status}
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-medium border border-green-500/20">
        <CheckCircle2 className="w-3.5 h-3.5" />
        {status}
      </span>
    );
  };

  const handleProjectClick = (project) => {
    setActiveProject(project);
    setActiveTab("frontend");
  };

  return (
    <div id="project" className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 relative">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 md:mb-16 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Technical Projects Portfolio
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
          Full-stack applications showcasing diverse expertise in modern web technologies and AI integration
        </p>
      </header>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {projectsData.map((project) => {
            const Icon = projectIcons[project.id];
            
            return (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="group cursor-pointer bg-gradient-to-br from-gray-900/50 to-black rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10 overflow-hidden"
              >
                {/* Project Header */}
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-gray-800">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold">{project.title}</h3>
                        <p className="text-gray-400 text-sm md:text-base">{project.subtitle}</p>
                      </div>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">{project.fullDescription}</p>

                  {/* Tech Stack Preview */}
                  <div className="mb-6">
                    <h4 className="text-gray-400 text-sm font-semibold mb-3">TECH STACK</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(project.techStack).flat().slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-900/50 text-gray-300 text-sm rounded-lg border border-gray-800"
                        >
                          {tech}
                        </span>
                      ))}
                      {Object.values(project.techStack).flat().length > 6 && (
                        <span className="px-3 py-1 bg-gray-900/50 text-gray-400 text-sm rounded-lg border border-gray-800">
                          +{Object.values(project.techStack).flat().length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Details Modal */}
        {activeProject && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-gray-800">
                      {React.createElement(projectIcons[activeProject.id], { className: "w-8 h-8 text-purple-400" })}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold">{activeProject.title}</h2>
                      <p className="text-gray-400">{activeProject.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={activeProject.status} />
                    <button
                      onClick={() => setActiveProject(null)}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Project Overview</h3>
                  <p className="text-gray-300 leading-relaxed">{activeProject.fullDescription}</p>
                </div>

                {/* Responsibilities Tabs */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">My Responsibilities</h3>
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {responsibilityTabs.map((tab) => {
                      const TabIcon = tab.icon;
                      if (!activeProject.responsibilities[tab.id]) return null;
                      
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            activeTab === tab.id
                              ? "bg-purple-600 text-white"
                              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                          }`}
                        >
                          <TabIcon className="w-4 h-4" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                  
                  {activeProject.responsibilities[activeTab] && (
                    <ul className="space-y-3">
                      {activeProject.responsibilities[activeTab].map((resp, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <div className="w-2 h-2 mt-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Technology Stack</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(activeProject.techStack).map(([category, techs]) => (
                      <div key={category} className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                        <h4 className="text-gray-400 font-semibold mb-3 uppercase text-sm tracking-wider">
                          {category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {techs.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 bg-gray-800/50 text-gray-300 text-sm rounded-lg border border-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {activeProject.links.live && (
                    <a
                      href={activeProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Live Demo
                    </a>
                  )}
                  {activeProject.links.github && (
                    <a
                      href={activeProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <Github className="w-4 h-4" />
                      View Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Summary */}
        <div className="mt-16 p-8 bg-gradient-to-r from-gray-900 to-black rounded-2xl border border-gray-800">
          <h3 className="text-2xl font-bold mb-8 text-center">Technology Expertise</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <Layers className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <div className="text-lg font-bold mb-2">Frontend</div>
              <div className="text-gray-400 text-sm">React, Tailwind, Chart.js</div>
            </div>
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <Cpu className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <div className="text-lg font-bold mb-2">Backend</div>
              <div className="text-gray-400 text-sm">Node.js, Express, Firebase</div>
            </div>
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <Database className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <div className="text-lg font-bold mb-2">Database</div>
              <div className="text-gray-400 text-sm">MongoDB, Firestore</div>
            </div>
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <Code2 className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <div className="text-lg font-bold mb-2">AI/ML</div>
              <div className="text-gray-400 text-sm">Whisper, YOLO, Python</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;