import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Code, Database, Link, Cloud, Globe } from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Programming Languages",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "JavaScript (ES6+)", percentage: 93, level: "Expert" },
        { name: "C++", percentage: 88, level: "Advanced" },
        { name: "Rust", percentage: 85, level: "Advanced" },
        { name: "Java", percentage: 54, level: "Intermediate" },
        { name: "Solidity", percentage: 82, level: "Advanced" }
      ]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Frameworks & Libraries",
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "React.js", percentage: 91, level: "Expert" },
        { name: "Node.js", percentage: 89, level: "Expert" },
        { name: "Express.js", percentage: 87, level: "Advanced" },
        { name: "Next.js", percentage: 86, level: "Advanced" }
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Databases",
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "MongoDB", percentage: 90, level: "Expert" },
        { name: "Firebase", percentage: 85, level: "Advanced" },
        { name: "MySQL", percentage: 84, level: "Advanced" }
      ]
    },
    {
      icon: <Link className="w-6 h-6" />,
      title: "Blockchain & Web3",
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Smart Contract Deployment", percentage: 85, level: "Advanced" },
        { name: "Web3.js / Ethers.js", percentage: 84, level: "Advanced" },
        { name: "Ethereum Network", percentage: 83, level: "Advanced" },
        { name: "DApps Development", percentage: 83, level: "Advanced" },
        { name: "Solidity", percentage: 82, level: "Advanced" },
        { name: "IPFS", percentage: 81, level: "Intermediate" }
      ]
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "DevOps & Cloud",
      color: "from-indigo-500 to-blue-500",
      skills: [
        { name: "Git & GitHub", percentage: 91, level: "Expert" },
        { name: "Docker", percentage: 86, level: "Advanced" },
        { name: "CI/CD Basics", percentage: 84, level: "Advanced" },
        { name: "Kubernetes", percentage: 82, level: "Advanced" },
        { name: "Jenkins", percentage: 48, level: "Intermediate" }
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Web Technologies",
      color: "from-yellow-500 to-amber-500",
      skills: [
        { name: "Frontend Development", percentage: 92, level: "Expert" },
        { name: "Full-Stack (MERN)", percentage: 90, level: "Expert" },
        { name: "Backend Development", percentage: 88, level: "Advanced" },
        { name: "RESTful APIs", percentage: 87, level: "Advanced" },
        { name: "WebSocket & Realtime", percentage: 85, level: "Advanced" }
      ]
    }
  ];

  const ProgressBar = ({ percentage, delay = 0 }) => (
    <motion.div 
      className="w-full bg-gray-700 rounded-full h-2 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </motion.div>
  );

  return (
      <div id='skills' className="relative py-20 px-6 lg:px-8 bg-[#111111]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4 text-white">
            / Technical Skills /
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels across modern web technologies, 
            blockchain development, and cloud infrastructure.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-500 hover:transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.name}
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{skill.level}</span>
                        <span className="text-sm font-bold text-cyan-400">{skill.percentage}%</span>
                      </div>
                    </div>
                    <ProgressBar 
                      percentage={skill.percentage} 
                      delay={(categoryIndex * 0.1) + (skillIndex * 0.05)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}></div>
            </motion.div>
          ))}
        </div>

        {/* Summary Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300">
              <span className="text-cyan-400 font-semibold">Full-Stack Mastery</span> • 
              <span className="text-purple-400 font-semibold"> Blockchain Integration</span> • 
              <span className="text-emerald-400 font-semibold"> DevOps Ready</span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;