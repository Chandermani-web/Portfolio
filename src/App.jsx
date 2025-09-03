import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Project from "./pages/Project";
import About from "./pages/About.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import FullScreenNav from "./Components/Navbar/FullScreenNav.jsx";
import Skills from "./pages/Skills.jsx";
import Contact from "./pages/Contact.jsx";
const App = () => {

  return (
    <div className="w-screen overflow-x-hidden bg-white text-black">
      <Navbar />
      <FullScreenNav />
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
