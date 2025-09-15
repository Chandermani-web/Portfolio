import React from "react";
import Video from "../Components/Home/Video.jsx";
import HomeHeroText from "../Components/Home/HomeHeroText.jsx";
import HomeBottomText from "../Components/Home/HomeBottomText.jsx";

const Home = () => {
  return (
    <div className="h-screen w-screen relative text-gray-100 bg-black">
      {/* Video or Image in background */}
      <div className="fixed top-0 h-full w-full">
        <Video />
        <img src="../../public/Nav-Images/image (2).png" alt="" className="w-full h-full object-cover" />
      </div>

      {/* Animation particales */}
      <div className="absolute top-1/4 left-1/4 w-10 h-10 rounded-full bg-cyan-500/20 animate-float-1"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-blue-500/30 animate-float-2"></div>
      <div className="absolute bottom-1/4 left-1/3 w-8 h-8 rounded-full bg-cyan-400/25 animate-float-3"></div>

      {/* Enhanced Rotator */}
      <div className="rotator absolute bottom-5 right-20 hidden sm:block">
        <div className="relative w-30 h-30">
          <div className="absolute inset-0 border-t-4 border-r-4 border-cyan-400 rounded-full animate-spin-slow">
            <div className="absolute inset-4 border-b-4 border-l-4 border-cyan-300 rounded-full animate-spin-reverse">
              <div className="absolute inset-4 flex flex-col justify-center items-center">
                <h1 className="font-bold font-mono text-cyan-200 tracking-wider rounded-full">
                  Active
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Text */}
      <div className="relative h-full flex flex-col justify-between">
        <HomeHeroText />
        <HomeBottomText />
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float-1 {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-float-3 {
          animation: float 12s ease-in-out infinite;
          animation-delay: 2s;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes spin-stop {
          from {
            transform: rotate(-360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
