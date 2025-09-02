import React from 'react'
import { Link } from 'react-router-dom'

const HomeBottomText = () => {

  return (
    <div className='font-[font2] flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-10 px-4'>
      <Link to="/about" className='link1 text-3xl sm:text-4xl md:text-[5vw] border-2 md:border-4 lg:border-5 border-white rounded-full px-6 sm:px-8 md:px-10 py-2 md:pt-3 uppercase leading-tight md:leading-[5vw] hover:border-[#D3FD50] hover:text-[#D3FD50] transition-all duration-200'>About</Link>
      <Link to="/projects" className='link2 text-3xl sm:text-4xl md:text-[5vw] border-2 md:border-4 lg:border-5 border-white rounded-full px-6 sm:px-8 md:px-10 py-2 md:pt-3 uppercase leading-tight md:leading-[5vw] hover:border-[#D3FD50] hover:text-[#D3FD50] transition-all duration-200'>Projects</Link>
    </div>
  )
}

export default HomeBottomText