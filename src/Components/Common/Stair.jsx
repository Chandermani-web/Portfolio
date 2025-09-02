import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router-dom";

const Stair = (props) => {
  const currentpath = useLocation().pathname;

  const stairParentRef = useRef(null);
  const pageRef = useRef(null);
  // const imageRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(stairParentRef.current, {
      display: "block",
    });
    tl.from(".stair div", {
      height: 0,
      stagger: {
        amount: -0.5,
      },
    });
    // tl.to(imageRef.current,{
    //   opacity: 1,
    //   duration: 1
    // })
    // tl.to(imageRef.current,{
    //   // x: "200%",
    //   opacity: 0,
    //   duration: 1,
    // })
    tl.to(".stair div", {
      y: "100%",
      stagger: {
        amount: 0.5,
      },
    });
    tl.to(stairParentRef.current, {
      display: "none",
    });
    tl.to(".stair div", {
      y: "0%",
    });

    gsap.from(pageRef.current,{
        opacity: 0,
        delay: 1.5,
    })
  }, [currentpath]);

  console.log(props.children)
  return (
    <div className="relative">
      <div ref={stairParentRef} className="h-full w-full fixed z-20 top-0">
        <div className="stair h-screen w-full flex">
          <div className="h-full w-1/5 bg-black"></div>
          <div className="h-full w-1/5 bg-black"></div>
          <div className="h-full w-1/5 bg-black "></div>
          <div className="h-full w-1/5 bg-black"></div>
          <div className="h-full w-1/5 bg-black"></div>
        </div>
      </div>

      {/* <img src="../../../public/Nav-Images/image (9).png" alt="" ref={imageRef} className="fixed top-0 bottom-0 right-0 -left-0 opacity-0 h-screen w-screen object-cover" /> */}

      <div ref={pageRef}>
        {props.children}
      </div>
    </div>
  );
};

export default Stair;
