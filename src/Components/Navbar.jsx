import React, { useEffect, useState } from "react";
import { Computer, GithubIcon, Linkedin, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(()=>{
    const tl = gsap.timeline();
    tl.fromTo("header",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
    tl.fromTo(".nav-p",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    )
  }, []) 

  return (
    <header className="w-full bg-transparent text-white">
      <nav className="flex justify-between items-center px-6 py-4 md:px-12">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Computer className="h-9 w-9 text-[#FEFAC2]" />
          <div className="leading-tight">
            <h2 className="text-2xl font-semibold">Chandermani</h2>
            <p className="nav-p text-gray-400 text-sm">Full Stack Developer</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-sans">
          <li><a href="#about" className="hover:text-[#FEFAC2] transition">About</a></li>
          <li><a href="#skills" className="hover:text-[#FEFAC2] transition">Skills</a></li>
          <li><a href="#project" className="hover:text-[#FEFAC2] transition">Projects</a></li>
          <li><a href="#contact" className="hover:text-[#FEFAC2] transition">Contact</a></li>
        </ul>

        {/* Social Icons (Desktop) */}
        <div className="hidden md:flex items-center gap-4 text-[#FEFAC2]">
          <a href="https://github.com/Chandermani-web" target="_blank" rel="noopener noreferrer">
            <GithubIcon className="border-2 h-8 w-8 p-1.5 rounded-full hover:bg-white hover:text-black transition duration-300" />
          </a>
          <a href="https://www.linkedin.com/in/chandermani-mishra-a25473304" target="_blank" rel="noopener noreferrer">
            <Linkedin className="border-2 h-8 w-8 p-1.5 rounded-full hover:bg-white hover:text-blue-800 transition duration-300" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-t border-gray-700 p-6 space-y-6">
          <ul className="flex flex-col space-y-4 text-lg font-sans">
            <li><a href="#about" onClick={toggleMobileMenu} className="hover:text-[#FEFAC2] transition">About</a></li>
            <li><a href="#skills" onClick={toggleMobileMenu} className="hover:text-[#FEFAC2] transition">Skills</a></li>
            <li><a href="#projects" onClick={toggleMobileMenu} className="hover:text-[#FEFAC2] transition">Projects</a></li>
            <li><a href="#contact" onClick={toggleMobileMenu} className="hover:text-[#FEFAC2] transition">Contact</a></li>
          </ul>

          <div className="flex items-center gap-4 text-[#FEFAC2]">
            <a href="https://github.com/Chandermani-web" target="_blank" rel="noopener noreferrer">
              <GithubIcon className="border-2 h-8 w-8 p-1.5 rounded-full hover:bg-white hover:text-black transition duration-300" />
            </a>
            <a href="http://www.linkedin.com/in/chandermani-mishra-a25473304" target="_blank" rel="noopener noreferrer">
              <Linkedin className="border-2 h-8 w-8 p-1.5 rounded-full hover:bg-white hover:text-blue-800 transition duration-300" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
