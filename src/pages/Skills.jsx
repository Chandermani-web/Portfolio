import React from "react";
import 'remixicon/fonts/remixicon.css'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const Skills = () => {
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(()=>{
        const tl = gsap.timeline();
        tl.from("h1",{
            y: -200,
            opacity: 0,
            duration: 1,
            scrub: true,
            delay: 1.5
        })
        tl.from("p",{
            scale: 0,
            duration: 0.5,
        })
        tl.from(".skills-title",{
            opacity: 0,
            y:40,
            duration: 0.5,
        })
        tl.from(".skills-list",{
            opacity: 0,
            rotateX: 90,
            duration: 0.6,
            stagger: 0.4,
        })
    })
  const skillCategories = [
    {
      title: "Frontend",
      color: "cyan",
      skills: [
        { name: "Javascript", level: 97, icon: "ri-javascript-line" },
        { name: "React", level: 95, icon: "ri-reactjs-line" },
        { name: "Next.js", level: 88, icon: "ri-nextjs-line" },
        { name: "Tailwind CSS", level: 92, icon: "ri-tailwind-css-line" },
        { name: "Angular.js", level: 52, icon: "ri-angularjs-line" },
      ],
    },
    {
      title: "Backend",
      color: "emerald",
      skills: [
        { name: "Nodejs", level: 97, icon: "ri-nodejs-line" },
        { name: "Express", level: 95, icon: "ri-server-line" },
        { name: "Python", level: 88, icon: "ri-python-line" },
      ],
    },
    {
      title: "Database",
      color: "amber",
      skills: [
        { name: "Mongodb", level: 85, icon: "ri-database-2-line" },
        { name: "MySQL", level: 88, icon: "ri-database-2-line" },
        { name: "Redis", level: 95, icon: "ri-database-2-line" },
      ],
    },
    {
      title: "Tools & Other",
      color: "indigo",
      skills: [
        { name: "Docker", level: 80, icon: "ri-docker-line" },
        { name: "AWS", level: 80, icon: "ri-amazon-line" },
        { name: "Git", level: 97, icon: "ri-git-branch-line" },
        { name: "GraphQL", level: 81, icon: "ri-graphql-line" },
      ],
    },
  ];

  // Color mapping for consistent styling
  const colorMap = {
    cyan: {
      text: "text-cyan-400",
      bg: "bg-cyan-400",
      border: "border-cyan-400",
      glow: "shadow-cyan-400/30",
      progress: "bg-cyan-500"
    },  
    emerald: {
      text: "text-emerald-400",
      bg: "bg-emerald-400",
      border: "border-emerald-400",
      glow: "shadow-emerald-400/30",
      progress: "bg-emerald-500"
    },
    amber: {
      text: "text-amber-400",
      bg: "bg-amber-400",
      border: "border-amber-400",
      glow: "shadow-amber-400/30",
      progress: "bg-amber-500"
    },
    indigo: {
      text: "text-indigo-400",
      bg: "bg-indigo-400",
      border: "border-indigo-400",
      glow: "shadow-indigo-400/30",
      progress: "bg-indigo-500"
    }
  };

  return (
    <section id="skills" className="min-h-screen py-16 sm:py-24 relative overflow-hidden bg-black">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none hidden sm:block">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-white/30 h-10"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 flex flex-col gap-3">
          <h1 className="font-bold text-3xl sm:text-5xl text-cyan-500">
            Technical Arsenal
          </h1>
          <p className="text-gray-400 text-sm sm:text-base px-2">
            Cutting-edge technologies and frameworks I use to bring ideas to
            life
          </p>
        </div>

        <video src="../../public/Nav-Images/skills-video .mp4" autoPlay muted loop className="hidden md:block h-screen w-screen object-cover fixed top-0 right-0 left-0 bottom-0 opacity-15" />

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {skillCategories.map((category, categoryIndex) => {
            const colorClass = colorMap[category.color];
            
            return (
              <div key={categoryIndex} className="space-y-6 skills-title">
                {/* Category Header */}
                <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                  <div
                    className={`w-4 h-4 rounded-full ${colorClass.bg} shadow-lg ${colorClass.glow}`}
                  ></div>
                  <h3 className="font-bold text-xl sm:text-2xl text-white font-serif">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex} 
                      className={`group p-4 rounded-lg border ${colorClass.border} transition-all duration-300 cursor-pointer hover:bg-white/6 bg-black`}
                      style={{boxShadow: "0 0 60px #0B1B2D"}}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <i className={`${skill.icon} text-xl sm:text-2xl ${colorClass.text}`}></i>
                          <span className="font-medium text-base sm:text-lg text-white">{skill.name}</span>
                        </div>
                        <span className={`${colorClass.text} font-bold text-sm sm:text-base`}>{skill.level}%</span>
                      </div>

                      {/* Progress bar */}
                      <div className="relative h-2 rounded-full overflow-hidden bg-gray-700">
                        <div 
                          className={`absolute top-0 left-0 h-full rounded-full ${colorClass.progress}`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-12 sm:mt-16 text-center px-4">
          <div className="p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto border-2 border-cyan-600 bg-black" style={{boxShadow: "0 0 60px #0B1B2D"}}>
            <h3 className="font-bold text-xl sm:text-2xl mb-3 sm:mb-4 text-cyan-500">Always Learning</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Technology evolves rapidly, and so do I. Currently exploring AI/ML integration, Web3 technologies, and advanced cloud architectures. The future is built by those who never stop learning.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;