import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Code2, Server, Database, Cpu, Cloud, Shield, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 70%",
        end: "top 50%",
        scrub: true,
      },
    });
    gsap.fromTo(
      ".about-section img",
      { opacity: 0, y: -400, scale: 0 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 3.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 50%",
          end: "top -10%",
          scrub: true,
        },
      },
    );
    tl.fromTo(
      ".about-section h1",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" },
      "-=1",
    );
    tl.fromTo(
      ".about-section h3",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" },
      "-=1",
    );
    tl.fromTo(
      ".about-section .md\\:mx-15 p",
      { opacity: 0, x: 50, stagger: 0.3 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.4,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 70%",
          end: "top -100%",
          scrub: true,
        },
      },
    );
  }, []);

  const skills = [
    {
      icon: Code2,
      label: "Frontend",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: Server,
      label: "Backend",
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      icon: Database,
      label: "Database",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      icon: Cpu,
      label: "DevOps",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      icon: Cloud,
      label: "Web3",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      icon: Shield,
      label: "Security",
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div
      id="about"
      className="md:flex gap-10 px-6 py-10 lg:px-8 text-[#a0a0a0] min-h-screen about-section bg-[#111111]"
    >
      {/* Image Section */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src="/IMG-20250829-WA0001.jpg"
          alt="Chandermani Mishra"
          className="object-cover md:w-[400px] md:h-[700px] rounded-t-full shadow-lg opacity-60 about-img"
        />
      </div>

      {/* About Text Section */}
      <div className="flex-1">
        <h1 className="text-7xl font-bold mb-6 text-gray-100 about-h1 flex items-center">
          <div className="h-4 w-20 bg-[#3b82f6] rounded-2xl"></div>About Me
        </h1>

        {/* <div className="md:mx-15 text-lg leading-relaxed">
          <h3 className="text-2xl font-semibold mb-4 about-h3">
            <span className="text-[#FEFAC2]">
              Full-Stack & Web3 Developer
            </span>{" "}
            | DevOps & Blockchain Enthusiast
          </h3>

          <p>
            I’m{" "}
            <span className="text-[#FEFAC2] font-semibold">
              Chandermani Mishra
            </span>
            , a passionate Full-Stack Developer and Web3 enthusiast with a strong
            focus on building secure, scalable, and high-performance digital
            solutions. My goal is to bridge the gap between traditional web
            applications and decentralized technologies by combining creativity
            with technical depth.
          </p>
          <br />

          <p>
            Over the past few years, I’ve worked extensively with modern web
            technologies such as{" "}
            <span className="text-[#FEFAC2] font-medium">
              HTML, CSS, JavaScript, React.js, Next.js, Node.js, Express.js,
              MongoDB, and SQL
            </span>
            . I’m also skilled in{" "}
            <span className="text-[#FEFAC2] font-medium">
              Docker, Kubernetes, and CI/CD pipelines
            </span>{" "}
            for automating and streamlining deployments.
          </p>
          <br />

          <p>
            Beyond traditional development, I actively explore the world of{" "}
            <span className="text-[#FEFAC2] font-medium">Web3 and blockchain</span>.
            My expertise includes working with{" "}
            <span className="text-[#FEFAC2] font-medium">
              Solidity, Smart Contracts, Web3.js, and Ethereum-based DApps
            </span>
            . This combination allows me to build solutions that are not only
            functional but also decentralized, secure, and future-ready.
          </p>
          <br />

          <p>
            One of my recent projects,{" "}
            <span className="text-[#FEFAC2] font-semibold">Lingolive</span>,
            reflects my commitment to creating impactful web applications that
            blend innovation with user experience. I believe in writing clean,
            maintainable code and following best practices to ensure long-term
            scalability and performance.
          </p>
          <br />

          <p>
            I’m always driven by curiosity and continuous learning — whether it’s
            exploring new frameworks, optimizing backend systems, or experimenting
            with blockchain integrations. Every project I take on is an
            opportunity to push boundaries and grow as a developer.
          </p>
          <br />

          <p className="mt-6 text-xl font-semibold text-[#FEFAC2]">
            “Building the Future of the Web — from Frontend to Blockchain.”
          </p>
        </div> */}

        {/* Title Section */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
              About Me
            </span>
          </div>

          <h1 className="about-title text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Building the Future
            </span>
            <br />
            <span className="text-white">of Digital Experiences</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="about-subtitle mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900 to-black rounded-xl border border-gray-800">
            <Sparkles className="w-5 h-5 text-[#FEFAC2]" />
            <h3 className="text-xl font-semibold">
              <span className="text-[#FEFAC2]">
                Full-Stack & Web3 Developer
              </span>{" "}
              |
              <span className="text-gray-300">
                {" "}
                DevOps & Blockchain Specialist
              </span>
            </h3>
          </div>
        </div>

        {/* Introduction */}
        <div className="space-y-6">
          <p className="about-paragraph text-lg text-gray-300 leading-relaxed">
            I'm{" "}
            <span className="text-[#FEFAC2] font-semibold">
              Chandermani Mishra
            </span>
            , a passionate full-stack developer and Web3 enthusiast dedicated to
            building secure, scalable, and high-performance digital solutions.
            My mission is to bridge traditional web applications with
            decentralized technologies through innovative engineering.
          </p>

          <p className="about-paragraph text-lg text-gray-300 leading-relaxed">
            With expertise in{" "}
            <span className="text-[#FEFAC2] font-medium">
              React, Next.js, Node.js, and modern web stacks
            </span>
            , combined with{" "}
            <span className="text-[#FEFAC2] font-medium">
              DevOps practices and blockchain development
            </span>
            , I create solutions that are both technically robust and
            forward-thinking.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mt-8">
          <h4 className="text-xl font-bold mb-6 text-white">Core Expertise</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-item group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                <div className={`p-3 rounded-lg ${skill.bg} ${skill.color}`}>
                  <skill.icon className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-semibold text-white">{skill.label}</h5>
                  <div className="h-1 w-12 bg-gradient-to-r from-gray-700 to-transparent rounded-full mt-1"></div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 ml-auto group-hover:text-blue-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
