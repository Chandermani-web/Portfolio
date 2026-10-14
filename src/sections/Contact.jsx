import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { CheckCircle2, Github, Linkedin, Loader2, Mail, MessageCircle, Phone, Send, Twitter } from 'lucide-react'
import Stage from '@/components/Stage'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createGlobe } from '@/three/scenes/globe'
import { profile } from '@/data/portfolio'
import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

// Same EmailJS account as the old site. Override with VITE_EMAILJS_* env vars when you rotate keys.
const EMAILJS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_m3i3i63',
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_2mk7cla',
  key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'AwZIH91gOp5V9z-48',
}

const links = [
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail, text: profile.email },
  { label: 'Phone', href: profile.phoneHref, icon: Phone, text: profile.phone },
  { label: 'WhatsApp', href: profile.whatsapp, icon: MessageCircle },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  { label: 'GitHub', href: profile.github, icon: Github },
  { label: 'X', href: profile.x, icon: Twitter },
]

const create = ({ el }) => createGlobe({ el })

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const statusRef = useRef(null)

  // feedback that shows what changed: the message slides in, the success tick pops, an error gives the panel a short shake
  useGSAP(
    () => {
      if (prefersReducedMotion() || status.state === 'idle' || status.state === 'sending') return
      const el = statusRef.current
      gsap.fromTo(el, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' })
      if (status.state === 'sent') gsap.fromTo(el.querySelector('svg'), { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(2.4)', delay: 0.1 })
      if (status.state === 'error') gsap.fromTo(el, { x: -8 }, { x: 0, duration: 0.8, ease: 'elastic.out(1, 0.25)' })
    },
    { dependencies: [status.state], scope: formRef },
  )

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'sending', message: '' })
    try {
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, formRef.current, EMAILJS.key)
      formRef.current.reset()
      setStatus({ state: 'sent', message: 'Message sent. I’ll reply from ' + profile.email + '.' })
    } catch {
      setStatus({ state: 'error', message: `That didn’t send. Email me directly at ${profile.email}.` })
    }
  }

  return (
    <section id="contact" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Let’s build something great." note="Freelance projects, long-term engagements, or a hard problem you’d like a second pair of hands on. Tell me what you’re building; I reply fast." />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div data-reveal="fade" className="relative">
            <Stage create={create} data-cursor="Drag" className="h-[min(92vw,520px)] w-full select-none" role="img" aria-label={`Globe centred on ${profile.location}, with signal arcs to London, Berlin, Dubai, Singapore and San Francisco`} />
            <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center font-mono text-xs text-muted-foreground">
              {profile.location} · remote-friendly worldwide
            </p>
          </div>

          <div data-reveal="right" className="hud-panel hud-clip p-6 sm:p-8">
            <form ref={formRef} onSubmit={submit} data-stagger="up" data-stagger-each="0.08" className="space-y-4" noValidate={false}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" name="name" required autoComplete="name" placeholder="Ada Lovelace" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your email</Label>
                  <Input id="email" name="email" type="email" required autoComplete="email" placeholder="ada@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" required placeholder="What’s this about?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" required placeholder="Tell me what you’re building." />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg" data-magnetic="0.25" disabled={status.state === 'sending'}>
                  {status.state === 'sending' ? <Loader2 className="animate-spin" /> : <Send />}
                  {status.state === 'sending' ? 'Sending' : 'Send message'}
                </Button>
                <p ref={statusRef} role="status" aria-live="polite" className={status.state === 'error' ? 'text-sm text-destructive' : 'flex items-center gap-2 text-sm text-ok'}>
                  {status.state === 'sent' && <CheckCircle2 className="size-4" />}
                  {status.message}
                </p>
              </div>
            </form>

            <div data-stagger="pop" data-stagger-each="0.06" className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
              {links.map(({ label, href, icon: Icon }) => (
                <Button key={label} asChild variant="outline" size="sm" shape="soft">
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    <Icon /> {label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
