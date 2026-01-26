import { useGSAP } from "@gsap/react";
import ProjectCard from "../Components/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Projects = () => {
  const projects = [
    {
      image1: "/Project-images/pexels-pixabay-41949.jpg",
      title1: "Lingolive- A Real-time Communication Platform",
      paragraph1:
        "Lingolive is an innovative chat platform that allows users to communicate seamlessly by hearing the other person’s voice in their own local language, breaking down language barriers in real-time.",
      tech1: [
        "Reactjs",
        "TailwindCSS",
        "ContextAPI",
        "Nodejs",
        "Expressjs",
        "MongoDB",
        "Cloudinary",
        "Socket.io",
        "Socket.io-client",
        "Python",
        "Whisper",
      ],
      link1: "https://lingolive.onrender.com",
      github1: "https://github.com/Chandermani-web/lingolive",
      image2: "/Project-images/pexels-canvastudio-3194519.jpg",
      title2: "AI-AUTOMATION FOR UGC-AICTE",
      paragraph2:
        "Smart India Hackathon (SIH) project aimed at digitizing and automating the regulatory approval process for higher education institutions under UGC and AICTE. Features role-based access, document validation, data workflows, and real-time status tracking..",
      tech2: [
        "Reactjs",
        "TailwindCSS",
        "Nodejs",
        "Expressjs",
        "MongoDB",
        "Cloudinary",
        "Socket.io",
        "Socket.io-client",
        "ContextAPI",
        "Whisper",
        "Chartjs",
        "YOLO",
        "Python",
      ],
      link2: false,
      github2:
        "https://github.com/Chandermani-web/edu-regulation-automation-platform",
    },
    {
      image1: "/Project-images/pexels-tima-miroshnichenko-6011598.jpg",
      title1: "C72",
      paragraph1:
        "C72 is a modern healthcare management platform that streamlines hospital operations and enhances patient care through digital solutions.",
      tech1: ["Reactjs", "TailwindCSS", "Chartjs", "Redux", "Firebase"],
      link1: "https://cliniccare124501.netlify.app/",
      github1: "https://github.com/Chandermani-web/Clinic-Management-System",
      image2: "/Project-images/pexels-alesiakozik-6772076.jpg",
      title2: "WealthWisdom",
      paragraph2:
        "WealthWisdom is a comprehensive financial platform designed for smart saving, investment tracking, and monitoring crypto and stock markets with real-time insights.",
      tech2: ["Reactjs", "CSS", "Firebase", "Google-api"],
      link2: false,
      github2: "https://github.com/Chandermani-web/Hackathon-wealthwisdom",
    },
    // {
    //   image1: "/Project-images/pexels-canvastudio-3194519.jpg",
    //   title1: "LAMAJEURE",
    //   paragraph1:
    //     "LAMAJEURE is a freelancing platform that empowers professionals to showcase their skills, connect with clients, and collaborate on projects globally.",
    //   image2: "/Project-images/pexels-donaldtong94-66134.jpg",
    //   title2: "SHELTON",
    //   paragraph2:
    //     "SHELTON is an entertainment platform that provides users with a rich movie-watching experience, featuring a wide variety of films across genres.",
    // },
  ];

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(function () {
    gsap.from(".hero", {
      height: "10px",
      stagger: { amount: 0.2 },
      scrollTrigger: {
        trigger: ".lol",
        start: "top 95%",
        end: "top -90%",
        scrub: true,
      },
    });
  });

  return (
    <div
      className="lg:p-4 p-2 text-white bg-[#0a0a0a] relative z-10"
      id="projects"
    >
      {/* Heading */}
      <div className="pt-10">
        <h2 className="font-[font2] text-4xl sm:text-6xl lg:text-[9.5vw] uppercase bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent z-50">
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
              tech1={elem.tech1}
              tech2={elem.tech2}
              link1={elem.link1}
              link2={elem.link2}
              github1={elem.github1}
              github2={elem.github2}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
