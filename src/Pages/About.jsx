import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(()=>{
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 70%",
        end: "top 50%",
        scrub: true,
      }
    });
    gsap.fromTo(".about-section img", {opacity:0, y: -400, scale: 0}, {opacity:1, y: 0, scale: 1, duration:3.5, ease:"power3.out", scrollTrigger: {
      trigger: ".about-section",
      start: "top 50%",
      end: "top -10%",
      scrub: true,
    }});
    tl.fromTo(".about-section h1", {opacity:0, x:-50}, {opacity:1, x:0, duration:1.5, ease:"power3.out"}, "-=1");
    tl.fromTo(".about-section h3", {opacity:0, x:50}, {opacity:1, x:0, duration:1.5, ease:"power3.out"}, "-=1");
    tl.fromTo(".about-section .md\\:mx-15 p", {opacity:0, x:50 , stagger: 0.3}, {opacity:1, x:0, stagger: 0.4, duration:1.5, ease:"power3.out", scrollTrigger: {
      trigger: ".about-section",
      start: "top 70%",
      end: "top -100%",
      scrub: true,
    }});
  },[]);
  return (
    <div id="about" className="md:flex gap-10 px-6 py-10 lg:px-8 text-[#a0a0a0] min-h-screen about-section bg-[#111111] sticky -top-330 md:-top-100">
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
        <h1 className="text-7xl font-bold mb-6 text-gray-100 about-h1 flex items-center"><div className="h-4 w-20 bg-[#3b82f6] rounded-2xl"></div>About Me</h1>

        <div className="md:mx-15 text-lg leading-relaxed">
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
        </div>
      </div>
      
    </div>
  );
};

export default About;
