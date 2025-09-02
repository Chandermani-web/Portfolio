import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import FullScreenNav from "./FullScreenNav";
import { NavbarContext } from "../Context/NavContext";

const Navbar = () => {
  const { navOpen, setnavOpen } = useContext(NavbarContext);
  console.log(navOpen)

  const navGreenRef = useRef(null);
  return (
    <div className="z-30 flex absolute top-0 w-full items-start justify-between px-2 sm:px-4">
      {/* Header */}
      <Link to="/" className="text-green-500 p-2 sm:p-3 font-bold font-[font2] text-2xl sm:text-[4vh] md:text-[5vh]" > PORTFOLIO </Link>

      {/* Menu */}
      <div
        className="bg-gray-800 w-24 sm:w-[10vw] relative cursor-pointer py-1"
        onMouseEnter={() => {
          navGreenRef.current.style.height = "100%"
          navGreenRef.current.style.color = "black"
        }}
        onMouseLeave={()=>{
          navGreenRef.current.style.height = "0"
        }}
        onClick={()=>{
          setnavOpen(true);
        }}
      >
        <div
          ref={navGreenRef}
          className="bg-[#D3FD50] w-full absolute top-0 h-0 transition-all duration-150"
        >
        </div>
        <div className="relative flex flex-col items-end px-4 sm:px-5">
          <div className="bg-white h-0.5 w-14 sm:w-[7vw] my-1"></div>
          <div className="bg-white h-0.5 w-12 sm:w-[6vw] my-1"></div>
          <div className="bg-white h-0.5 w-10 sm:w-[5vw] my-1"></div>
        </div>
      </div>

      {/* FullNavbar */}
    </div>
  );
};

export default Navbar;
