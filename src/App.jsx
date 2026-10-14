import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/layout/Layout'
import PageShell from '@/components/PageShell'
import Home from '@/pages/Home'

// One chunk per page, so a visitor only downloads the 3D code for the page they open
const About = lazy(() => import('@/sections/About'))
const Stack = lazy(() => import('@/sections/Stack'))
const Backend = lazy(() => import('@/sections/Backend'))
const Projects = lazy(() => import('@/sections/Projects'))
const Architecture = lazy(() => import('@/sections/Architecture'))
const Services = lazy(() => import('@/sections/Services'))
const Experience = lazy(() => import('@/sections/Experience'))
const Contact = lazy(() => import('@/sections/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const page = (id, Section) => (
  <PageShell id={id}>
    <Section />
  </PageShell>
)

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={page('about', About)} />
        <Route path="stack" element={page('stack', Stack)} />
        <Route path="mern-java" element={page('backend', Backend)} />
        <Route path="projects" element={page('projects', Projects)} />
        <Route path="architecture" element={page('architecture', Architecture)} />
        <Route path="services" element={page('services', Services)} />
        <Route path="experience" element={page('experience', Experience)} />
        <Route path="contact" element={page('contact', Contact)} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
