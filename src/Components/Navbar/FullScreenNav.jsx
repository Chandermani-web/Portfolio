import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NavbarContext } from "../Context/NavContext";

const FullScreenNav = () => {
  const fullNavLinksRef = useRef(null);
  const fullScreenNavRef = useRef(null);
  const { navOpen, setnavOpen } = useContext(NavbarContext);
  console.log(navOpen);
  const navGreenRef = useRef(null);
  function gsapAnimation() {
    const tl = gsap.timeline();
    tl.to("#fullscreennav", {
      display: "block",
    });
    tl.to(".stairing div", {
      // delay: 0.2,
      height: "100%",
      stagger: {
        amount: -0.2,
      },
    });
    tl.to(".link", {
      opacity: 1,
      rotateX: 0,
      stagger: {
        amount: 0.1,
      },
    });
    tl.to(".navlink", {
      opacity: 1,
    });
  }
  function gsapAnimationReverse() {
    const tl = gsap.timeline();
    tl.to(".link", {
      opacity: 0,
      rotateX: 90,
      stagger: {
        amount: 0.1,
      },
    });
    tl.to(".stairing div", {
      height: 0,
      stagger: {
        amount: 0.1,
      },
    });
    tl.to("#fullscreennav", {
      display: "none",
    });
  }

  useGSAP(
    function () {
      if (navOpen) {
        gsapAnimation();
      } else {
        gsapAnimationReverse();
      }
    },
    [navOpen]
  );

  return (
    <div
      ref={fullScreenNavRef}
      id="fullscreennav"
      className="hidden h-screen w-full absolute overflow-x-hidden bg-gray-950 text-white z-50"
    >
      <div className="h-screen w-full fixed">
        <div className="stairing h-full w-full flex">
          <div className="h-full w-1/5 bg-red-900"></div>
          <div className="h-full w-1/5 bg-red-900"></div>
          <div className="h-full w-1/5 bg-red-900 hidden sm:block"></div>
          <div className="h-full w-1/5 bg-red-900 hidden md:block"></div>
          <div className="h-full w-1/5 bg-red-900 hidden lg:block"></div>
        </div>
      </div>

      <div ref={fullNavLinksRef} className="relative">
        <div className="navlink flex w-full justify-between items-start px-3 sm:px-6">
          <div>
            <Link
              to="/"
              className="text-green-400 p-2 sm:p-3 font-bold font-[font2] text-3xl sm:text-[5vh] md:text-[6vh] uppercase"
            >
              {" "}
              Portfolio{" "}
            </Link>
          </div>
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
          setnavOpen(false);
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
        </div>

        <div className="text-center py-20">

          <div className="link border-y-2 relative py-3 origin-top overflow-hidden cursor-pointer group" onClick={()=>{
            window.location.href = "/about"
          }}>
            <h1 className="uppercase py-3 relative font-[font2] text-center pt-1 sm:pt-3 text-4xl sm:text-[3vw]">
              About
            </h1>
            <div className='absolute top-0 bg-[#D3FD50] text-black py-2 sm:py-3 opacity-0 moveX flex'>
            <div className='flex items-center'>
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>Know About</h2>
              <img src="../../../public/Nav-Images/image (2).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>Chandermani</h2>
              <img src="../../../public/Nav-Images/image (9).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
            </div>
            <div className='flex items-center '>
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>Know About</h2>
              <img src="../../../public/Nav-Images/image (2).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>Chandermani</h2>
              <img src="../../../public/Nav-Images/image (9).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
            </div>
            <div className='flex items-center '>
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>Know About</h2>
              <img src="../../../public/Nav-Images/image (2).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>Chandermani</h2>
              <img src="../../../public/Nav-Images/image (9).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
            </div>
          </div>
          </div>

          <div className="link border-y-2 relative py-3 origin-top overflow-hidden cursor-pointer group" onClick={()=>{
            window.location.href = "/projects"
          }}>
            <h1 className="uppercase py-3 relative font-[font2] text-center pt-1 sm:pt-3 text-4xl sm:text-[3vw]">
              Projects
            </h1>
            <div className='absolute top-0 bg-[#D3FD50] text-black py-2 sm:py-3 opacity-0 moveX flex'>
            <div className='flex items-center'>
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>Projects</h2>
              <img src="../../../public/Nav-Images/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>that i build</h2>
              <img src="../../../public/Nav-Images/image (11).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
            </div>
            <div className='flex items-center'>
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>Projects</h2>
              <img src="../../../public/Nav-Images/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>that i build</h2>
              <img src="../../../public/Nav-Images/image (11).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
            </div>
            <div className='flex items-center'>
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>Projects</h2>
              <img src="../../../public/Nav-Images/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>that i build</h2>
              <img src="../../../public/Nav-Images/image (11).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
            </div>
          </div>
          </div>

          <div className="link border-y-2 relative py-3 origin-top overflow-hidden cursor-pointer group" onClick={()=>{
            window.location.href = "/skills"
          }}>
            <h1 className="uppercase py-3 relative font-[font2] text-center pt-1 sm:pt-3 text-4xl sm:text-[3vw]">
              Skills
            </h1>
            <div className='absolute top-0 bg-[#D3FD50] text-black py-2 sm:py-3 opacity-0 moveX flex'>
            <div className='flex items-center'>
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>frontend animation</h2>
              <img src="../../../public/Nav-Images/Google_AI_Studio_2025-08-23T08_33_19.733Z.png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>backend</h2>
              <img src="../../../public/Nav-Images/image (10).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
            </div>
            <div className='flex items-center'>
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>frontend animation</h2>
              <img src="../../../public/Nav-Images/Google_AI_Studio_2025-08-23T08_33_19.733Z.png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>backend</h2>
              <img src="../../../public/Nav-Images/image (10).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
            </div>
            <div className='flex items-center'>
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>frontend animation</h2>
              <img src="../../../public/Nav-Images/Google_AI_Studio_2025-08-23T08_33_19.733Z.png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>backend</h2>
              <img src="../../../public/Nav-Images/image (10).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
            </div>
          </div>
          </div>

          <div className="link border-y-2 relative py-3 origin-top overflow-hidden cursor-pointer group" onClick={()=>{
            window.location.href = "/contact"
          }}>
            <h1 className="uppercase py-3 relative font-[font2] text-center pt-1 sm:pt-3 text-4xl sm:text-[3vw]">
              Contact
            </h1>
            <div className='absolute top-0 bg-[#D3FD50] text-black py-2 sm:py-3 opacity-0 moveX flex'>
            <div className='flex items-center'>
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>let's connect</h2>
              <img src="../../../public/Nav-Images/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'> together</h2>
              <img src="../../../public/Nav-Images/image (8).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
            </div>
            <div className='flex items-center'> 
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>let's connect</h2>
              <img src="../../../public/Nav-Images/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'> together</h2>
              <img src="../../../public/Nav-Images/image (8).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
            </div>
            <div className='flex items-center'> 
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'>let's connect</h2>
              <img src="../../../public/Nav-Images/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
              <h2 className='whitespace-nowrap font-[font2] text-2xl sm:text-[4vw] text-center leading-1 pt-1 uppercase'> together</h2>
              <img src="../../../public/Nav-Images/image (8).png" alt="" className='h-10 sm:h-14 rounded-full shrink-0 w-24 sm:w-32 object-cover' />
            </div>
          </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .link:hover .moveX {
          opacity: 1; /* show when parent is hovered */
          animation: moveX 6s linear infinite;
        }

        @keyframes moveX {
          0% {
            transform: translateX(0%); /* start offscreen to the right */
          }
          100% {
            transform: translateX(-45%); /* move all the way to the left */
          }
        }
      `}</style>
    </div>
  );
};

export default FullScreenNav;
