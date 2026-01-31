// File: src/components/Feature.jsx (or Pages/Feature.jsx)
import React from "react";
import { 
  Cpu, 
  Server, 
  Zap, 
  Database, 
  Cloud, 
  GitBranch,
  Code2,
  Network,
  Sparkles,
  ArrowRight,
  Target,
  Layers,
  Rocket
} from "lucide-react";

const Feature = () => {
  const engineeringAreas = [
    {
      icon: Cpu,
      title: "System Architecture",
      description: "Scalable & maintainable system design",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Layers,
      title: "Microservices Design",
      description: "Distributed systems & service orchestration",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Zap,
      title: "Real-Time Applications",
      description: "WebSocket, SSE & live data streaming",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10"
    },
    {
      icon: Server,
      title: "API Design & REST",
      description: "Clean, documented & versioned APIs",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10"
    },
    {
      icon: Database,
      title: "Database Optimization",
      description: "Query performance & data modeling",
      color: "text-amber-400",
      bgColor: "bg-amber-500/10"
    },
    {
      icon: Cloud,
      title: "DevOps & Deployment",
      description: "CI/CD, containerization & cloud infrastructure",
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10"
    },
    {
      icon: Rocket,
      title: "Generative AI Integration",
      description: "LLMs, AI workflows & intelligent automation",
      color: "text-pink-400",
      bgColor: "bg-pink-500/10"
    },
    {
      icon: Network,
      title: "Performance Tuning",
      description: "Optimization & high-load systems",
      color: "text-red-400",
      bgColor: "bg-red-500/10"
    },
    {
      icon: Code2,
      title: "Code Quality",
      description: "Clean code, testing & best practices",
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description: "Git workflows & collaboration",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: Target,
      title: "Problem Solving",
      description: "Analytical thinking & solution design",
      color: "text-violet-400",
      bgColor: "bg-violet-500/10"
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Emerging tech & future-proof solutions",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10"
    }
  ];

  return (
    <section id="expertise" className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Engineering Focus Areas
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Specialized expertise across modern software development domains, 
            combining technical depth with innovative problem-solving
          </p>
        </div>

        {/* Engineering Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {engineeringAreas.map((area, index) => {
            const Icon = area.icon;
            
            return (
              <div
                key={area.title}
                className="group"
              >
                <div className={`
                  h-full relative rounded-2xl overflow-hidden border transition-all duration-300
                  border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50
                  hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2
                `}>
                  {/* Card Content */}
                  <div className="p-6 md:p-8">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${area.bgColor} border border-gray-800`}>
                        <Icon className={`w-6 h-6 ${area.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {area.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="h-px w-6 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                          <span className="text-sm text-gray-400">EXPERTISE</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm md:text-base mb-6">
                      {area.description}
                    </p>

                    {/* Progress Indicator */}
                    <div className="mt-6 pt-6 border-t border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">PROFICIENCY</span>
                        <span className={`text-xs font-semibold ${area.color}`}>
                          {index < 6 ? "EXPERT" : "ADVANCED"}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ease-out ${
                            index < 6 
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500" 
                              : "bg-gradient-to-r from-purple-500 to-pink-500"
                          }`}
                          style={{ 
                            width: index < 6 ? "95%" : "85%"
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Hover Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-gradient-to-r from-gray-900 to-black border border-gray-800 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to Build Together?
              </h3>
              <p className="text-gray-400">
                Let's leverage these engineering capabilities for your next project
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact"
                className="group flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg font-semibold text-white transition-all duration-300"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#projects"
                className="group flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg font-semibold text-white transition-all duration-300"
              >
                <span>View Case Studies</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;