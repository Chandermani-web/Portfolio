import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Feature from "./Pages/Feature";
import Skills from "./Pages/Skills";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";

const App = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      <Home />
      <About />
      <Feature />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;