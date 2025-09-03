import { useGSAP } from "@gsap/react";
import ProjectCard from "../Components/Projects/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Projects = () => {
  const projects = [
    {
      image1:
        "https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_1280x960-1280x960.jpg",
      title1: "Lingolive",
      paragraph1:
        "Lingolive is an innovative chat platform that allows users to communicate seamlessly by hearing the other person’s voice in their own local language, breaking down language barriers in real-time.",
      image2: "../../public/Project-images/pexels-alesiakozik-6772076.jpg",
      title2: "WealthWisdom",
      paragraph2:
        "WealthWisdom is a comprehensive financial platform designed for smart saving, investment tracking, and monitoring crypto and stock markets with real-time insights.",
    },
    {
      image1:
        "../../public/Project-images/pexels-tima-miroshnichenko-6011598.jpg",
      title1: "C72",
      paragraph1:
        "C72 is a modern healthcare management platform that streamlines hospital operations and enhances patient care through digital solutions.",
      image2: "../../public/Project-images/pexels-olly-3756345.jpg",
      title2: "CECP",
      paragraph2:
        "CECP is a user-friendly e-commerce platform that connects customers with products effortlessly, offering a smooth and engaging shopping experience.",
    },
    {
      image1: "../../public/Project-images/pexels-canvastudio-3194519.jpg",
      title1: "LAMAJEURE",
      paragraph1:
        "LAMAJEURE is a freelancing platform that empowers professionals to showcase their skills, connect with clients, and collaborate on projects globally.",
      image2: "../../public/Project-images/pexels-donaldtong94-66134.jpg",
      title2: "SHELTON",
      paragraph2:
        "SHELTON is an entertainment platform that provides users with a rich movie-watching experience, featuring a wide variety of films across genres.",
    },
  ];

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(function () {
    gsap.from(".hero", {
      height: "100px",
      stagger: { amount: 0.4 },
      scrollTrigger: {
        trigger: ".lol",
        start: "top 100%",
        end: "top -150%",
        scrub: true,
      },
    });
  });

  return (
    <div className="lg:p-4 p-2 pb-[10vh] bg-black text-white">
      {/* Heading */}
      <div className="pt-[20vh] sm:pt-[30vh] lg:pt-[45vh]">
        <h2 className="font-[font2] text-4xl sm:text-6xl lg:text-[9.5vw] uppercase">
          Projects <sup className="text-green-400">6</sup>
        </h2>
      </div>

      {/* Projects List */}
      <div className="lol mt-8 lg:mt-20">
        {projects.map((elem, idx) => (
          <div
            key={idx}
            className="hero w-full mb-4 flex flex-col lg:flex-row gap-2 lg:gap-4 lg:h-[850px]"
          >
            <ProjectCard
              image1={elem.image1}
              image2={elem.image2}
              title1={elem.title1}
              title2={elem.title2}
              paragraph1={elem.paragraph1}
              paragraph2={elem.paragraph2}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
