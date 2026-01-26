import React from 'react';

const ProjectCard = (props) => {
  // const openLink = (url) => {
  //   window.open(url, "_blank"); // opens in new tab
  // };

  return (
    <>
      {/* Card 1 */}
      <div
        className={`w-full lg:w-1/2 group transition-all relative rounded-none hover:rounded-[70px] overflow-hidden h-full ${ !props.link1 && "cursor-not-allowed" }`}
        //  onClick={props.link1 ? () => openLink(props.link1) : undefined}
      >
        <img className="h-full w-full object-cover" src={props.image1} alt="" />
        <div className="opacity-100 lg:opacity-0 transition-opacity group-hover:opacity-100 absolute top-0 flex flex-col gap-5 items-center justify-center left-0 h-full w-full bg-black/30 lg:bg-black/15 text-center">
          
          <div className="flex-1 flex justify-center items-center gap-4">
            <a href={props.link1} className="text-white bg-black/40 p-4 flex flex-col items-center self-center hover:-translate-y-1.5 transition-all duration-300 rounded-2xl" target="_blank" rel="noopener noreferrer">
              <i className="ri-eye-line text-xl text-white text-2xl"></i>
              <span className="text-xl text-white text-2xl">Live Demo</span>
            </a>
            <a href={props.github1} className="text-white bg-black/40 p-4 flex flex-col items-center self-center hover:-translate-y-1.5 transition-all duration-300 rounded-2xl" target="_blank" rel="noopener noreferrer">
              <i className="ri-github-line text-xl text-white text-2xl"></i>
              <span className="text-xl text-white text-2xl">GitHub</span>
            </a>
          </div>
          
          <div className='flex-1 bg-black/50 flex flex-col justify-center items-center'>
            <h2 className="uppercase text-2xl sm:text-4xl lg:text-6xl font-[font1] pt-2 sm:pt-4 px-4 sm:px-8 text-white rounded-full text-center">
            {props.title1}
            </h2>
            <p className="uppercase text-xl sm:text-xl text-black/80 bg-white/50 lg:text-2xl font-[font1] pt-2 sm:pt-4 px-4 sm:px-8 lg:rounded-full hidden sm:block text-center">
              {props.paragraph1}
            </p>
            <div className='flex flex-wrap gap-5 p-10'>
              {
                props.tech1.map((elem,index)=>(
                  <div key={index} className='uppercase text-black/80 bg-white/50 p-2 lg:rounded-full hidden sm:block text-center'>{elem}</div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div
        className={`w-full lg:w-1/2 group transition-all relative rounded-none hover:rounded-[70px] overflow-hidden h-full ${ !props.link2 && "cursor-not-allowed" }`}
        //  onClick={props.link2 ? () => openLink(props.link2) : undefined}
      >
        <img className="h-full w-full object-cover" src={props.image2} alt="" />
        <div className="opacity-100 lg:opacity-0 transition-opacity group-hover:opacity-100 absolute top-0 flex flex-col gap-5 items-center justify-center left-0 h-full w-full bg-black/30 lg:bg-black/15">
          
          <div className="flex-1 flex justify-center items-center gap-4">
            <a href={props.link2} className="text-white bg-black/40 p-4 flex flex-col items-center self-center hover:-translate-y-1.5 transition-all duration-300 rounded-2xl" target="_blank" rel="noopener noreferrer">
              <i className="ri-eye-line text-xl text-white text-2xl"></i>
              <span className="text-xl text-white text-2xl">Live Demo</span>
            </a>
            <a href={props.github2} className="text-white bg-black/40 p-4 flex flex-col items-center self-center hover:-translate-y-1.5 transition-all duration-300 rounded-2xl" target="_blank" rel="noopener noreferrer">
              <i className="ri-github-line text-xl text-white text-2xl"></i>
              <span className="text-xl text-white text-2xl">GitHub</span>
            </a>
          </div>

          <div className='flex-1 bg-black/50 flex flex-col justify-center items-center'>
            <h2 className="uppercase text-2xl sm:text-4xl lg:text-6xl font-[font1] pt-2 sm:pt-4 px-4 sm:px-8 text-white rounded-full text-center">
            {props.title2}
            </h2>
            <p className="uppercase text-xl sm:text-xl text-black/80 bg-white/50 lg:text-2xl font-[font1] pt-2 sm:pt-4 px-4 sm:px-8 lg:rounded-full hidden sm:block text-center">
              {props.paragraph2}
            </p>
            <div className='flex flex-wrap gap-5 p-10'>
              {
                props.tech2.map((elem,index)=>(
                  <div key={index} className='uppercase text-black/80 bg-white/50 p-2 lg:rounded-full hidden sm:block text-center'>{elem}</div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;