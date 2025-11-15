import React from 'react';

const ProjectCard = (props) => {
  return (
    <>
      <div className="w-full lg:w-1/2 group transition-all relative rounded-none hover:rounded-[70px] overflow-hidden h-full">
        <img className="h-full w-full object-cover" src={props.image1} alt="" />
        <div className="opacity-100 lg:opacity-0 transition-opacity group-hover:opacity-100 absolute top-0 flex flex-col gap-5 items-center justify-center left-0 h-full w-full bg-black/30 lg:bg-black/15">
          <h2 className="uppercase text-2xl sm:text-4xl lg:text-6xl font-[font1] border-2 sm:border-4 pt-2 sm:pt-4 px-4 sm:px-8 text-white border-white rounded-full">
            {props.title1}
          </h2>
          <p className="uppercase text-xl sm:text-xl text-black/80 bg-white/50 lg:text-2xl font-[font1] border-1 sm:border-4 pt-2 sm:pt-4 px-4 sm:px-8 border-black/80 lg:rounded-full hidden sm:block">
            {props.paragraph1}
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 group transition-all relative rounded-none hover:rounded-[70px] overflow-hidden h-full">
        <img className="h-full w-full object-cover" src={props.image2} alt="" />
        <div className="opacity-100 lg:opacity-0 transition-opacity group-hover:opacity-100 absolute top-0 flex flex-col gap-5 items-center justify-center left-0 h-full w-full bg-black/30 lg:bg-black/15">
          <h2 className="uppercase text-2xl sm:text-4xl lg:text-6xl font-[font1] border-2 sm:border-4 pt-2 sm:pt-4 px-4 sm:px-8 text-white border-white rounded-full">
            {props.title2}
          </h2>
          <p className="uppercase text-xl sm:text-xl text-black/80 bg-white/50 lg:text-2xl font-[font1] border-1 sm:border-4 pt-2 sm:pt-4 px-4 sm:px-8 border-black/80 lg:rounded-full hidden sm:block">
            {props.paragraph2}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
