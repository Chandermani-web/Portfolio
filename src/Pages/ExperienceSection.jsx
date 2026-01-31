import React, { useState } from "react";
import { 
  Trophy, 
  Award, 
  Rocket, 
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  TrendingUp,
  Users,
  Zap,
  Briefcase,
  Code2,
  Cpu,
  Database,
  Cloud,
  GitBranch
} from "lucide-react";

const ExperienceSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const experiences = [
    {
      type: "Hackathon",
      title: "Smart India Hackathon 2023",
      organization: "AICTE, Government of India",
      location: "National",
      date: "9 - 10 December 2025",
      achievement: "🏆 National Winner",
      description: "Led development of AI-powered content automation platform. Implemented intelligent workflows, GPT-4 integration, and real-time processing for 50,000+ documents.",
      impact: [
        "Reduced content approval time by 75%",
        "Supported 2,000+ institutions",
        "Processed 50,000+ documents in 6 months",
      ],
      skills: ["Backend Architecture", "GPT-4 Integration", "React", "Node.js", "MongoDB"],
    },
    {
      type: "Project",
      title: "Full-Stack Product Development",
      organization: "Independent / Open Source",
      location: "Remote",
      date: "Ongoing",
      achievement: "✨ Production Systems",
      description: "Built and shipped 4+ full-stack applications from concept to production, handling architecture, backend, frontend, and deployment.",
      impact: [
        "Real-time systems supporting 1000+ concurrent users",
        "Scalable APIs processing millions of requests/month",
        "Open-source contributions with 500+ GitHub stars",
      ],
      skills: ["Next.js", "Node.js", "PostgreSQL", "MongoDB", "WebSockets"],
    },
    {
      type: "Hackathon",
      title: "Local Hackathons & Competitions",
      organization: "Various Tech Communities",
      location: "Remote",
      date: "2025",
      achievement: "🎯 Two Wins",
      description: "Participated in 10+ hackathons. Built AI chatbots, real-time collaboration tools, and data visualization platforms under tight deadlines.",
      impact: [
        "Won 2 hackathon titles",
        "Built 4+ projects in 48-hour sprints",
        "Learned new tech stacks rapidly",
      ],
      skills: ["Rapid Development", "Problem Solving", "Team Collaboration", "Full-Stack"],
    },
  ];

  const experienceIcons = {
    Hackathon: Trophy,
    Project: Rocket,
    "Open Source": GitBranch,
  };

  const getIconForType = (type) => {
    return experienceIcons[type] || Briefcase;
  };

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 relative">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 md:mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20">
            <Briefcase className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Experience & Achievements
            </h1>
            <p className="text-gray-400 mt-2">Demonstrated excellence in competitive programming and production development</p>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-400 text-sm">National Wins</span>
            </div>
            <div className="text-3xl font-bold">1</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <Rocket className="w-5 h-5 text-purple-400" />
              <span className="text-gray-400 text-sm">Projects Shipped</span>
            </div>
            <div className="text-3xl font-bold">4+</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-green-400" />
              <span className="text-gray-400 text-sm">Hackathons</span>
            </div>
            <div className="text-3xl font-bold">3+</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400 text-sm">Users Impacted</span>
            </div>
            <div className="text-3xl font-bold">100+</div>
          </div>
        </div>
      </header>

      {/* Experience Timeline */}
      <section className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-cyan-500/30"></div>

          {experiences.map((exp, index) => {
            const Icon = getIconForType(exp.type);
            const isExpanded = expandedCard === index;
            const isEven = index % 2 === 0;

            return (
              <div key={index} className={`relative mb-8 md:mb-12 ${isEven ? 'md:pr-1/2 md:pl-4' : 'md:pl-1/2 md:pr-4'}`}>
                {/* Timeline dot */}
                <div className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#0a0a0a] z-10
                  ${exp.type === "Hackathon" ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 
                    exp.type === "Project" ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 
                    'bg-gradient-to-r from-blue-500 to-cyan-500'}`}></div>

                {/* Experience Card */}
                <div className={`ml-12 md:ml-0 ${isEven ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div 
                    className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 cursor-pointer group"
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="p-6 md:p-8">
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${exp.type === "Hackathon" ? 'bg-yellow-500/10 border border-yellow-500/20' : 
                            exp.type === "Project" ? 'bg-purple-500/10 border border-purple-500/20' : 
                            'bg-blue-500/10 border border-blue-500/20'}`}>
                            <Icon className={`w-6 h-6 ${exp.type === "Hackathon" ? 'text-yellow-400' : 
                              exp.type === "Project" ? 'text-purple-400' : 
                              'text-blue-400'}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl md:text-2xl font-bold">{exp.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${exp.type === "Hackathon" ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                                exp.type === "Project" ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                                'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                                {exp.type}
                              </span>
                            </div>
                            <p className="text-gray-300 font-medium">{exp.organization}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Achievement Badge */}
                      <div className="mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="font-semibold text-blue-300">{exp.achievement}</span>
                        </div>
                      </div>

                      {/* Meta Information */}
                      <div className="flex flex-wrap gap-4 mb-6 text-gray-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{exp.date}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed mb-6">{exp.description}</p>

                      {/* Skills */}
                      <div className="mb-6">
                        <h4 className="text-gray-400 text-sm font-semibold mb-3 flex items-center gap-2">
                          <Cpu className="w-4 h-4" />
                          Skills Applied
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-gray-800/50 text-gray-300 text-sm rounded-lg border border-gray-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-gray-800">
                          <h4 className="text-gray-300 font-semibold mb-4 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            Key Impact & Results
                          </h4>
                          <ul className="space-y-3">
                            {exp.impact.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 flex-shrink-0"></div>
                                <span className="text-gray-300">{item}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Detailed Metrics */}
                          {exp.type === "Hackathon" && index === 0 && (
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 p-4 rounded-lg border border-blue-500/20">
                                <div className="text-2xl font-bold text-white mb-1">75%</div>
                                <div className="text-sm text-blue-300">Time Reduction</div>
                              </div>
                              <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/10 p-4 rounded-lg border border-purple-500/20">
                                <div className="text-2xl font-bold text-white mb-1">50K+</div>
                                <div className="text-sm text-purple-300">Documents Processed</div>
                              </div>
                              <div className="bg-gradient-to-br from-green-900/20 to-green-900/10 p-4 rounded-lg border border-green-500/20">
                                <div className="text-2xl font-bold text-white mb-1">2K+</div>
                                <div className="text-sm text-green-300">Institutions Supported</div>
                              </div>
                            </div>
                          )}

                          {exp.type === "Project" && (
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/10 p-4 rounded-lg border border-purple-500/20">
                                <div className="text-2xl font-bold text-white mb-1">1K+</div>
                                <div className="text-sm text-purple-300">Concurrent Users</div>
                              </div>
                              <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 p-4 rounded-lg border border-blue-500/20">
                                <div className="text-2xl font-bold text-white mb-1">Millions</div>
                                <div className="text-sm text-blue-300">Monthly API Requests</div>
                              </div>
                              <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 p-4 rounded-lg border border-yellow-500/20">
                                <div className="text-2xl font-bold text-white mb-1">500+</div>
                                <div className="text-sm text-yellow-300">GitHub Stars</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="max-w-7xl mx-auto mt-16">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8">
          <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Technical Proficiency
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Core Development */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-6 h-6 text-blue-400" />
                <h3 className="font-semibold">Core Development</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">Full-Stack Development</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">REST APIs</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">Real-time Systems</span>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <Star key={5} className="w-4 h-4 text-gray-600" />
                  </div>
                </li>
              </ul>
            </div>

            {/* Databases */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-green-400" />
                <h3 className="font-semibold">Databases</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">MongoDB</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">PostgreSQL</span>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <Star key={5} className="w-4 h-4 text-gray-600" />
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">Firebase/Firestore</span>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <Star key={5} className="w-4 h-4 text-gray-600" />
                  </div>
                </li>
              </ul>
            </div>

            {/* AI/ML */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-6 h-6 text-purple-400" />
                <h3 className="font-semibold">AI/ML Integration</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">GPT-4 Integration</span>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <Star key={5} className="w-4 h-4 text-gray-600" />
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">Whisper API</span>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <Star key={5} className="w-4 h-4 text-gray-600" />
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">AI Workflows</span>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <Star key={5} className="w-4 h-4 text-gray-600" />
                  </div>
                </li>
              </ul>
            </div>

            {/* Soft Skills */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-cyan-400" />
                <h3 className="font-semibold">Competitive Skills</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">Rapid Development</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">Problem Solving</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-300">Team Leadership</span>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <Star key={5} className="w-4 h-4 text-gray-600" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperienceSection;