import React from "react";
import Video from "./Video.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HomeHeroText = () => {
  useGSAP(()=>{
    gsap.from(".name",{
      x: -800,
      duration: 1,
      delay: 1.5,
    })
    gsap.from(".passion1",{
      x: 800,
      duration: 1,
      delay:1.5,
    })
    gsap.from(".passion2",{
      y: 800,
      duration: 1,
      delay:1.5,
    })
    gsap.from(".content",{
      y: 100,
      opacity: 0,
      duration: 2,
      delay: 1.5,
    })
  })
  return (
    <div className="font-[font1] px-4 py-10 sm:py-0">
      <div className="name uppercase text-center text-5xl sm:text-7xl md:text-[9vw] flex justify-center items-center leading-tight md:leading-[8vw]">
        Chandermani
      </div>
      <div className="passion1 uppercase text-center text-5xl sm:text-7xl md:text-[9vw] flex justify-center items-center leading-tight md:leading-[8vw]">
        Full
        <div className="h-10 sm:h-16 md:h-[5vw] overflow-hidden -mt-2 md:-mt-5">
          <Video />
        </div>{" "}Stack
      </div>
      <div className="passion2 uppercase text-center text-5xl sm:text-7xl md:text-[9vw] flex justify-center items-center leading-tight md:leading-[8vw]">
        Developer
      </div>
      <div className="flex justify-end text-white font-[font2]">
        <p className="content w-[92%] sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 text-xs sm:text-sm md:text-base text-right mr-4 sm:mr-10">
          I’m a full-stack developer passionate about transforming ideas into engaging digital experiences. My focus goes beyond functionality—I aim to craft applications with seamless user journeys, fluid animations, and visually striking interfaces that feel intuitive and alive. From building interactive frontends to architecting robust backends, I love creating solutions that merge aesthetic design with technical precision, delivering products that are both beautiful and impactful.
        </p>
      </div>
    </div>
  );
};

export default HomeHeroText;
