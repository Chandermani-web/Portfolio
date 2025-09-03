import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "remixicon/fonts/remixicon.css";

const About = () => {
  gsap.registerPlugin(ScrollTrigger);
  const imageDivRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const images = [
    "../../public/My Photos/IMG-20250829-WA0001.jpg",
    "../../public/My Photos/IMG-20250829-WA0002.jpg",
    "../../public/My Photos/IMG-20250829-WA0003.jpg",
    "../../public/My Photos/IMG-20250829-WA0005.jpg",
    "../../public/My Photos/IMG-20250829-WA0006.jpg",
    "../../public/My Photos/IMG-20250829-WA0007.jpg",
    "../../public/My Photos/IMG-20250829-WA0009.jpg",
    "../../public/My Photos/IMG-20250829-WA0010.jpg",
    "../../public/My Photos/IMG_20230810_085904.jpg",
  ];

  useGSAP(() => {
    const tl = gsap.timeline();
    // Image animation
    tl.from("h1", {
      rotateX: 90,
      duration: 1,
      stagger: 0.5,
    });
    tl.from(imageDivRef.current, {
      scrollTrigger: {
        trigger: imageDivRef.current,
        start: "top 28%",
        end: "top -45%",
        pin: true,
        pinSpacing: true,
        pinReparent: true,
        pinType: "transform",
        scrub: 3,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          let imageIndex;
          if (self.progress < 1) {
            imageIndex = Math.floor(self.progress * images.length);
          } else {
            imageIndex = images.length - 1;
          }
          imageRef.current.src = images[imageIndex];
        },
      },
    });
    tl.from(".content", {
      x: 1000,
      scrollTrigger: {
        trigger: ".content",
        start: "top 70%",
        end: "top 65%",
        scrub: 1,
        pin: true,
      },
    });
  });

  return (
    <div
      className="bg-black text-gray-200 min-h-screen overflow-hidden pb-20 relative flex flex-col"
      ref={containerRef}
    >
      {/* Top Panel */}
      <div className="relative mb-10 px-4">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full neon-glow"
              style={{
                width: `${100 + i * 100}px`,
                height: `${100 + i * 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(0, 255, 255, 0.${
                  1 + i
                }) 0%, transparent 70%)`,
                opacity: 0.3,
                filter: "blur(40px)",
              }}
            />
          ))}
        </div>

        <div className="section1 relative z-10">
          <div
            ref={imageDivRef}
            className="hidden md:block h-[40vw] md:h-[25vw] w-[50vw] md:w-[20vw] rounded-3xl md:rounded-4xl absolute top-[60vh] md:top-85 left-[8vw] md:left-[20vw] bg-red-500 overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/30"
          >
            <img
              src={images[0]}
              ref={imageRef}
              className="h-full w-full overflow-hidden object-cover rounded-4xl transition-all duration-200"
              alt="Profile"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
          </div>

          <div className="relative font-mono">
            <div className="pt-[20vh] sm:pt-[25vh]">
              <h1 className="text-6xl sm:text-8xl md:text-[25vh] leading-tight md:leading-[25vh] tracking-tighter uppercase text-left bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                let's
              </h1>
              <h1 className="text-6xl sm:text-8xl md:text-[25vh] leading-tight md:leading-[25vh] tracking-tighter uppercase text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Discuss
              </h1>
              <h1 className="text-6xl sm:text-8xl md:text-[25vh] leading-tight md:leading-[25vh] tracking-tighter uppercase text-right bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                about me
              </h1>
            </div>

            <div className="md:pl-[50%] flex flex-col gap-10 md:pr-[5%] mt-10 md:mt-20">
              <p className="content text-base sm:text-lg md:text-2xl text-gray-300 leading-relaxed font-[font1]">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                I'm Chandermani Mishra, a passionate full-stack developer with
                expertise in JavaScript, TailwindCSS, React.js, Node.js,
                Express.js, MongoDB, SQL, and GSAP focused on building intuitive
                user interfaces and scalable backend systems. Through projects
                and hackathons, I've developed strong skills in problem-solving,
                collaboration, and rapid prototyping, while exploring modern
                technologies like Next.js, Firebase, and WebRTC. My goal is to
                craft impactful digital solutions and continually refine my
                craft as an engineer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Panel */}
      <div
        className="features-section relative py-20 px-4 md:px-10 text-gray-200"
        ref={containerRef}
      >
        <div className="mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-10 md:mb-16 pb-2 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-10">
            What I Bring to the Table
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(0,_1fr)]">
            {[
              {
                index: 1,
                icon: "ri-code-s-slash-line",
                title: "Clean Code",
                description:
                  "Writing maintainable, scalable, and reusable solutions that follow best practices.",
                longDescription:
                  "I focus on writing code that is easy to read, well-structured, and future-proof. Following SOLID principles, modularity, and proper documentation ensures the project can be easily maintained by any developer in the long run.",
                image:
                  "../../public/Nav-Images/50ff59cc0550df5b36543807a58db98c52e01a22274a317eafbfa5266941579b-640x290.png",
                color: "from-cyan-500 to-blue-500",
              },
              {
                index: 2,
                icon: "ri-flashlight-line",
                title: "Performance",
                description:
                  "Crafting highly optimized, fast, and responsive applications that deliver smooth experiences.",
                longDescription:
                  "Performance is not just speed—it's about delivering seamless experiences. I leverage efficient algorithms, lazy loading, caching strategies, and optimized database queries to ensure applications run smoothly even under heavy loads.",
                image:
                  "../../public/Nav-Images/photo-1460925895917-afdab827c52f.avif",
                color: "from-violet-500 to-purple-500",
              },
              {
                index: 3,
                icon: "ri-stack-line",
                title: "Full-Stack Development",
                description:
                  "Building complete solutions from database to frontend with seamless integration.",
                longDescription:
                  "From designing RESTful APIs and managing databases to building intuitive UIs, I bring a strong full-stack perspective. This ensures smooth communication between frontend and backend, reducing bottlenecks and enhancing scalability.",
                image:
                  "../../public/Nav-Images/photo-1531403009284-440f080d1e12.avif",
                color: "from-green-400 to-emerald-500",
              },
              {
                index: 4,
                icon: "ri-heart-line",
                title: "Passion & Creativity",
                description:
                  "Driven by a genuine love for creating meaningful, user-friendly digital experiences.",
                longDescription:
                  "I see coding as a form of creativity—just like art. My passion for building drives me to explore new technologies, push design boundaries, and deliver experiences that truly stand out and delight users.",
                image:
                  "../../public/Nav-Images/photo-1515879218367-8466d910aaa4.avif",
                color: "from-pink-500 to-rose-500",
              },
              {
                index: 5,
                icon: "ri-team-line",
                title: "Collaboration",
                description:
                  "Thrives in teamwork, contributing ideas, sharing knowledge, and learning from others.",
                longDescription:
                  "Great products are built by great teams. I excel in pair programming, code reviews, and brainstorming sessions, ensuring that collaboration leads to innovation and collective growth.",
                image:
                  "../../public/Nav-Images/photo-1542831371-29b0f74f9713.avif",
                color: "from-indigo-500 to-sky-500",
              },
              {
                index: 6,
                icon: "ri-lightbulb-line",
                title: "Problem Solving",
                description:
                  "Strong analytical mindset to tackle challenges and deliver innovative solutions.",
                longDescription:
                  "I approach challenges with curiosity and persistence. By breaking problems into smaller parts and analyzing patterns, I develop innovative, practical, and scalable solutions for both technical and business needs.",
                image:
                  "../../public/Nav-Images/photo-1506784983877-45594efa4cbe.avif",
                color: "from-yellow-400 to-orange-500",
              },
              {
                index: 7,
                icon: "ri-brush-line",
                title: "UI/UX Focus",
                description:
                  "Prioritizing user experience with modern, intuitive, and visually appealing designs.",
                longDescription:
                  "I believe technology should feel effortless. My focus on UI/UX ensures products not only look modern but also provide smooth, intuitive, and accessible interactions that users love.",
                image:
                  "../../public/Nav-Images/photo-1545235617-9465d2a55698.avif",
                color: "from-teal-400 to-cyan-500",
              },
              {
                index: 8,
                icon: "ri-communication-line",
                title: "Communication",
                description:
                  "Clear and effective communicator, ensuring smooth collaboration with teams and clients.",
                longDescription:
                  "Good communication reduces misunderstandings and speeds up development. I prioritize transparency, timely updates, and active listening to ensure everyone is aligned with the vision and goals.",
                image:
                  "../../public/Nav-Images/photo-1587560699334-cc4ff634909a.avif",
                color: "from-purple-400 to-fuchsia-500",
              },
              {
                index: 9,
                icon: "ri-refresh-line",
                title: "Adaptability",
                description:
                  "Quick to adapt to new technologies, frameworks, and environments with a growth mindset.",
                longDescription:
                  "In tech, change is constant. I stay curious and flexible, quickly learning new tools, frameworks, and methodologies. This adaptability ensures I stay ahead and can contribute in any environment.",
                image:
                  "../../public/Nav-Images/photo-1498050108023-c5249f4df085.avif",
                color: "from-red-400 to-orange-500",
              },
            ].map((item) => {
              const spanClasses =
            item.index === 1
              ? "lg:col-span-2 lg:py-10"
              : item.index === 2
              ? "lg:row-span-2 lg:py-40"
              : item.index === 6
              ? "lg:col-span-2 lg:py-10"
              : "";
              return (
              <div
                key={item.index}
                className={`feature-card group relative flex flex-col justify-between gap-3 ${spanClasses} border-2 border-white/40 rounded-2xl`}
                style={{ boxShadow: "0 4px 20px rgba(0,255,255,0.2)" }}
              >
                {/* Main Card */}
                <div>
                  {/* Image */}
                  <div className="flex justify-center mb-4">
                    <div className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[20vw] aspect-video bg-gradient-to-r from-cyan-900 to-blue-900 flex items-center justify-center overflow-hidden rounded-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base px-2 sm:px-4">
                    {item.longDescription}
                  </p>
                </div>

                <div
                  className={`flex flex-col items-center overflow-hidden px-4 sm:px-6 py-4  backdrop-blur-sm bg-gray-900/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-gray-800/40`}
                >
                  <div
                    className={`text-3xl sm:text-4xl flex gap-3 justify-center items-center bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                  >
                    <i className={item.icon}></i>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 text-center">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
                    {item.description}
                  </p>
                </div>


                {/* Hover Overlay */}
                {/* <div className="absolute inset-2 sm:inset-6 md:inset-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:z-10 transition-all duration-500 ease-in-out flex flex-col items-center justify-center rounded-2xl p-3 sm:p-4 text-center bg-gradient-to-r from-gray-900 to-blue-900 max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:max-w-[30vw] mx-auto">
                  <div className="flex justify-center mb-4">
                    <div className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[20vw] aspect-video bg-gradient-to-r from-cyan-900 to-blue-900 flex items-center justify-center overflow-hidden rounded-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-red-500 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base px-2 sm:px-4">
                    {item.longDescription}
                  </p>
                </div> */}
              </div>
            )})}
          </div>
        </div>
      </div>

      {/* Bottom Panel */}
      <div></div>

      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(6, 182, 212, 0.8);
          }
          100% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;
