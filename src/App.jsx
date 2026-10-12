import Scene3D from '@/components/Scene3D'
import Nav from '@/components/Nav'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Stack from '@/sections/Stack'
import Backend from '@/sections/Backend'
import Projects from '@/sections/Projects'
import Architecture from '@/sections/Architecture'
import Now from '@/sections/Now'
import Services from '@/sections/Services'
import Experience from '@/sections/Experience'
import Contact from '@/sections/Contact'

export default function App() {
  return (
    <>
      <Scene3D />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Stack />
        <Backend />
        <Projects />
        <Architecture />
        <Services />
        <Now />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
