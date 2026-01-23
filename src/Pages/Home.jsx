import React, { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    // starting animation
    useEffect(()=>{
        const tl = gsap.timeline();
        tl.fromTo(".hero-img", 
            {y: 300, opacity: 0, scale: 1},
            {y: 0, opacity: 1, duration: 1, scale: 1, ease: "power2.out", scrollTrigger:{
                trigger: ".h hero-imgero-img",
                start: "top 80%",
            }}
        );

        tl.fromTo(".hero-paragraph",
            {y: 50, opacity: 0},
            {y: 0, opacity: 1, duration: 1, ease: "power2.out", scrollTrigger:{
                trigger: ".hero-paragraph",
                start: "top 80%",
            }}
        )

        tl.fromTo(".hero-contact-btn",
            {y: -1000 , rotate: -360, opacity: 0},
            {y: 0, rotate: 0, opacity: 1, duration: 1, ease: "power2.out", scrollTrigger:{
                trigger: ".hero-contact-btn",
                start: "top 80%",
            }}
        )

        gsap.fromTo(".hero-h1 span",
            {x: -100, opacity: 0 , stagger: 0.1},
            {x: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power2.out", scrollTrigger:{ 
                trigger: ".hero-h1",
                start: "top 80%",
            }}
        )
    },[])
  return (
    <div className='relative px-6 py-16 lg:px-8 bg-[#0a0a0a]'>
        {/* for laptop */}
        <div className='md:h-[92vh] md:w-[32vw] rounded-full hidden md:flex absolute right-[25vw] top-17'>
            <img src="/IMG-20250829-WA0002.jpg" alt="image" className='object-cover w-full h-full rounded-full mask-x-from-blue-500 opacity-50 hero-img' />
        </div>

        {/* for mobile */}
        <div className='h-[32vh] w-[42vw] rounded-full md:hidden absolute right-15 top-10'>
            <img src="/IMG-20250829-WA0002.jpg" alt="image" className='object-cover w-full h-full rounded-full mask-x-from-blue-500 opacity-50 hero-img' />
        </div>

        <div className='md:ml-30 mt-30 relative'>
            <div className='relative'>
                <p className='hero-paragraph text-xl font-sans text-[#a0a0a0]'>Professional Developer</p>
                <p className='hero-paragraph md:absolute right-30 text-2xl text-[#a0a0a0]'>*Working in India</p>
            </div>

            <div className='flex flex-col md:text-9xl text-4xl my-10 tracking-wide md:leading-25 text-[#FEFAC2]'>
                <h1 className='hero-h1'>{"Hello, I'm".split(" ").map((word, index) => {
                    word = word.split("");
                    return word.map((char, charIndex) => (
                        <span key={index + '-' + charIndex}>{char}</span>
                    ));
                    
                })}</h1>

                <h1 className='hero-h1'>{"Chandermani".split("").map((char, index) => (
                    <span key={index}>{char}</span>
                ))}</h1>
            </div>

            <div className='md:py-20'>
                <p className="w-[95%] md:w-2/6 font-light text-justify text-[#a0a0a0] md:ml-10 italic hero-paragraph">
                    <span className="text-blue-500 text-4xl mr-3">*</span>I'm a <span className="text-[#FEFAC2] font-semibold">full-stack developer</span> passionate about <span className="text-[#FEFAC2] font-semibold"> transforming ideas </span> into <span className="text-[#FEFAC2] font-semibold"> engaging digital experiences</span>. My focus goes beyond functionality — I aim to craft applications with <span className="text-[#FEFAC2] font-semibold"> seamless user journeys</span>, <span className="text-[#FEFAC2] font-semibold"> fluid animations</span>, and <span className="text-[#FEFAC2] font-semibold"> visually striking interfaces</span> that feel <span className="text-[#FEFAC2] font-semibold"> intuitive and alive</span>. From building <span className="text-[#FEFAC2] font-semibold"> interactive frontends</span> to architecting 
                    <span className="text-[#FEFAC2] font-semibold"> robust backends</span>, I love creating solutions that merge <span className="text-[#FEFAC2] font-semibold"> aesthetic design</span> with <span className="text-[#FEFAC2] font-semibold"> technical precision</span>, delivering products that are both <span className="text-[#FEFAC2] font-semibold"> beautiful</span> and <span className="text-[#FEFAC2] font-semibold"> impactful</span>
                </p>
            </div>

            <div className='md:absolute right-30 bottom-35 hero-contact-btn'>
                <div className='mt-10 relative ml-7'>
                    <div className='h-25 w-25 border-2 border-[#FEFAC2] rounded-full absolute -left-7 -top-6 -z-10'></div>
                    <a href='#contact' className='flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] rounded-full text-[#FEFAC2] hover:bg-blue-700 transition duration-300'>
                        Contact Me <ArrowRight size={20} />
                    </a>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Home
