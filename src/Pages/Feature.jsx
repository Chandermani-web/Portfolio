import React, { useEffect } from 'react'
import 'remixicon/fonts/remixicon.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Feature = () => {
  useEffect(()=>{
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".feature-card-section",
        start: "top 70%",
        end: "top 50%",
        scrub: true,
      }
    })
    tl.fromTo(".feature-card-section h2",
      {y: 50, opacity: 0},
      {y: 0, opacity: 1, duration: 1, ease: "power2.out"}
    );
    tl.fromTo(".feature-paragraph",
      {y: 50, opacity: 0},
      {y: 0, opacity: 1, duration: 1, ease: "power2.out"},
    );
    tl.fromTo(".feature-card",
      {scale: 0, opacity: 0},
      {scale: 1, opacity: 1, duration:  1, ease: "power2.out", stagger: 0.2, scrollTrigger: {
        trigger: ".feature-card-section",
        start: "top 18%",
        end: "top 10%",
        scrub: true,
      }},
    );
  },[])

  return (
    <div id='features'>
      <div
        className="relative py-10 px-4 md:px-10 bg-[#0a0a0a] min-h-0 feature-card-section"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-5xl sm:text-5xl md:text-8xl font-bold mb-4 pb-2 text-center bg-gradient-to-br from-gray-200 via-blue-400 to-gray-300 bg-clip-text text-transparent mt-10">
            / What I Bring to the Table /
          </h2>
          <p className="text-center text-lg mx-auto md:w-[65%] md:text-2xl mb-10 text-[#a0a0a0] feature-paragraph">
            I offer a unique blend of skills and experiences that enable me to tackle complex challenges and deliver exceptional results.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(0,_1fr)] z-30">
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
                  "/Nav-Images/50ff59cc0550df5b36543807a58db98c52e01a22274a317eafbfa5266941579b-640x290.png",
                color: "from-cyan-500 to-blue-600",
                bgColor: "bg-gradient-to-br from-cyan-50 to-blue-100"
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
                  "/Nav-Images/photo-1460925895917-afdab827c52f.avif",
                color: "from-violet-600 to-purple-600",
                bgColor: "bg-gradient-to-br from-violet-50 to-purple-100"
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
                  "/Nav-Images/photo-1531403009284-440f080d1e12.avif",
                color: "from-emerald-500 to-green-600",
                bgColor: "bg-gradient-to-br from-emerald-50 to-green-100"
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
                  "/Nav-Images/photo-1515879218367-8466d910aaa4.avif",
                color: "from-rose-500 to-pink-600",
                bgColor: "bg-gradient-to-br from-rose-50 to-pink-100"
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
                  "/Nav-Images/photo-1542831371-29b0f74f9713.avif",
                color: "from-indigo-500 to-blue-600",
                bgColor: "bg-gradient-to-br from-indigo-50 to-blue-100"
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
                  "/Nav-Images/photo-1506784983877-45594efa4cbe.avif",
                color: "from-amber-500 to-orange-600",
                bgColor: "bg-gradient-to-br from-amber-50 to-orange-100"
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
                  "/Nav-Images/photo-1545235617-9465d2a55698.avif",
                color: "from-teal-500 to-cyan-600",
                bgColor: "bg-gradient-to-br from-teal-50 to-cyan-100"
              },
              {
                index: 8,
                icon: "ri-speak-ai-fill",
                title: "Communication",
                description:
                  "Clear and effective communicator, ensuring smooth collaboration with teams and clients.",
                longDescription:
                  "Good communication reduces misunderstandings and speeds up development. I prioritize transparency, timely updates, and active listening to ensure everyone is aligned with the vision and goals.",
                image:
                  "/Nav-Images/photo-1587560699334-cc4ff634909a.avif",
                color: "from-purple-500 to-fuchsia-600",
                bgColor: "bg-gradient-to-br from-purple-50 to-fuchsia-100"
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
                  "/Nav-Images/photo-1498050108023-c5249f4df085.avif",
                color: "from-orange-500 to-red-600",
                bgColor: "bg-gradient-to-br from-orange-50 to-red-100"
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
                className={`feature-card group relative flex flex-col justify-between gap-3 ${spanClasses} border border-[#2a2a2a] rounded-2xl bg-[#1a1a1a] backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-[#3b82f6] transition-all duration-300`}
              >
                {/* Main Card */}
                <div>
                  {/* Image */}
                  <div className="flex justify-center mb-4">
                    <div className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[20vw] aspect-video bg-gradient-to-r from-white to-gray-100 flex items-center justify-center overflow-hidden rounded-xl shadow-md mt-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.warn("Feature image failed to load:", e.target.src);
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-[#a0a0a0] text-xs sm:text-sm md:text-base px-2 sm:px-4">
                    {item.longDescription}
                  </p>
                </div>

                <div
                  className="flex flex-col items-center overflow-hidden px-4 sm:px-6 py-4 bg-[#111111] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 rounded-2xl mx-2 my-2 border border-[#2a2a2a]"
                >
                  <div
                    className={`text-3xl sm:text-4xl flex gap-3 justify-center items-center bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                  >
                    <i className={item.icon}></i>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 text-cente">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[#a0a0a0] text-sm sm:text-base text-center sm:text-left">
                    {item.description}
                  </p>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feature