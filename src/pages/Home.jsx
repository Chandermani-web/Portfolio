import Hero from '@/sections/Hero'
import TechMarquee from '@/components/TechMarquee'
import HomeIndex from '@/components/HomeIndex'
import Now from '@/sections/Now'
import CtaBand from '@/components/CtaBand'

export default function Home() {
  return (
    <div>
      <Hero />
      <TechMarquee />
      <HomeIndex />
      <Now />
      <CtaBand />
    </div>
  )
}
