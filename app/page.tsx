'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useScroll,
  AnimatePresence,
} from 'framer-motion'
import { portfolioVideos, showreel } from '@/data/portfolio'
import type { PortfolioVideo, ShowreelConfig } from '@/types'

type ActiveVideo = ShowreelConfig

function buildEmbedSrc(id: string, autoplay = false) {
  return `https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479${autoplay ? '&autoplay=1' : ''}`
}

// ─── VideoCard ────────────────────────────────────────────────────────────────

function VideoCard({
  video,
  index,
  isActive,
  onSelect,
}: {
  video: PortfolioVideo
  index: number
  isActive: boolean
  onSelect: (video: PortfolioVideo) => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 400, damping: 40 })
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), { stiffness: 400, damping: 40 })
  const glareX = useTransform(mouseX, [0, 1], ['0%', '100%'])
  const glareY = useTransform(mouseY, [0, 1], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
    setHovered(false)
  }

  const isExternal = !video.id && !video.embedSrc
  const num = String(index + 1).padStart(2, '0')

  const handleClick = () => {
    if (isExternal) {
      window.open(video.url, '_blank', 'noopener,noreferrer')
    } else {
      onSelect(video)
    }
  }

  const videoKey = video.id ?? video.url

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      aria-label={isExternal ? `Open ${video.title}` : `Play ${video.title}`}
      aria-pressed={isActive}
      data-cursor={isExternal ? 'OPEN' : 'PLAY'}
      className="group relative block w-full aspect-video bg-avo-surface overflow-hidden rounded-xl text-left"
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail */}
      {video.thumbnail ? (
        <motion.img
          src={video.thumbnail}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : video.id ? (
        <motion.img
          src={`https://vumbnail.com/${video.id}.jpg`}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-avo-surface to-avo-dark flex items-center justify-center">
          <span className="text-[10px] font-body tracking-[0.3em] uppercase text-avo-dim">Frame.io</span>
        </div>
      )}

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-avo-black via-avo-black/30 to-transparent"
        animate={{ opacity: hovered || isActive ? 0.88 : 0.5 }}
        transition={{ duration: 0.3 }}
      />

      {/* Green glare */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '60%',
          height: '60%',
          left: glareX,
          top: glareY,
          translate: '-30% -30%',
          background: 'radial-gradient(circle, rgba(184,212,106,0.10) 0%, transparent 70%)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Index number */}
      <motion.span
        className="absolute top-3 right-3 text-[10px] font-display font-600 tracking-widest text-avo-cream/30"
        animate={{ opacity: hovered || isActive ? 0 : 0.4 }}
        transition={{ duration: 0.2 }}
      >
        {num}
      </motion.span>

      {/* Now playing badge */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute top-3 left-3 flex items-center gap-1.5 bg-avo-flesh/90 rounded-full px-2 py-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Animated bars */}
            <span className="flex items-end gap-px h-2.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-px bg-avo-black rounded-full"
                  animate={{ height: ['40%', '100%', '60%', '100%', '40%'] }}
                  transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </span>
            <span className="text-[8px] font-body font-500 tracking-widest uppercase text-avo-black">
              Playing
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play / Open button */}
      <AnimatePresence>
        {hovered && !isActive && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-11 h-11 rounded-full border border-avo-flesh/60 flex items-center justify-center backdrop-blur-sm bg-avo-black/30">
              {isExternal ? (
                <svg className="w-4 h-4 text-avo-flesh" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-avo-flesh ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 px-3 pb-3"
        animate={{ y: hovered || isActive ? 0 : 6, opacity: hovered || isActive ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-avo-cream text-[10px] font-body font-400 tracking-[0.1em] uppercase leading-snug">
          {video.title}
        </p>
      </motion.div>

      {/* Active/hover border */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none border"
        animate={{
          borderColor: isActive
            ? 'rgba(184,212,106,0.6)'
            : hovered
            ? 'rgba(184,212,106,0.2)'
            : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(6,9,4,0.93)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(44,61,28,0.5)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-5 py-4 md:py-5 flex items-center justify-between gap-4">
        {/* Left — name & role */}
        <div className="flex items-baseline gap-3 md:gap-5 min-w-0">
          <h1 className="text-xl md:text-2xl font-display font-700 tracking-tight text-avo-cream leading-none whitespace-nowrap">
            Jordan Toia
          </h1>
          <span className="hidden md:block text-xs font-body font-400 tracking-[0.25em] uppercase text-avo-dim whitespace-nowrap">
            Director · DOP · Editor
          </span>
        </div>

        {/* Right — contact block */}
        <nav className="flex flex-col items-end gap-2 shrink-0">
          {/* Row 1 — availability — hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-avo-flesh opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-avo-flesh" />
            </span>
            <span className="text-[11px] font-body tracking-[0.3em] uppercase text-avo-flesh whitespace-nowrap">
              Available for Work
            </span>
          </div>

          {/* Row 2 — details scale with breakpoint */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Phone — desktop only */}
            <a
              href="tel:+61448174270"
              data-cursor="CALL"
              className="hidden lg:block text-sm font-body text-avo-cream/70 hover:text-avo-cream transition-colors duration-300 tracking-wide whitespace-nowrap"
            >
              +61 448 174 270
            </a>
            <span className="hidden lg:block w-px h-4 bg-avo-border" />
            {/* Email — tablet+ */}
            <a
              href="mailto:jordan@zoomfilmtv.com.au"
              data-cursor="EMAIL"
              className="hidden md:block text-sm font-body text-avo-cream/70 hover:text-avo-cream transition-colors duration-300 tracking-wide whitespace-nowrap"
            >
              jordan@zoomfilmtv.com.au
            </a>
            <span className="hidden md:block w-px h-4 bg-avo-border" />
            {/* Saint pitch — subtle ghost pill */}
            <a
              href="/saint-pitch/"
              data-cursor="VIEW"
              className="hidden md:flex items-center px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-avo-border text-avo-dim hover:border-avo-flesh/50 hover:text-avo-cream text-xs font-body font-600 tracking-[0.12em] uppercase transition-colors duration-300 whitespace-nowrap"
            >
              Sa1nt Pitch
            </a>
            {/* Contact button — always visible */}
            <a
              href="mailto:jordan@zoomfilmtv.com.au"
              data-cursor="EMAIL"
              className="flex items-center px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-avo-flesh text-avo-black text-xs font-body font-600 tracking-[0.12em] uppercase hover:bg-avo-cream transition-colors duration-300 whitespace-nowrap"
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </motion.header>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection({ activeVideo }: { activeVideo: ActiveVideo }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  const isShowreel = activeVideo.id === showreel.id

  return (
    <section ref={sectionRef} className="relative pt-20 md:pt-28 pb-10 md:pb-16 px-5 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Top meta row */}
        <motion.div
          className="flex items-center justify-between mb-5 md:mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-avo-flesh" />
            <AnimatePresence mode="wait">
              <motion.span
                key={isShowreel ? 'showreel' : 'work'}
                className="text-[10px] font-body tracking-[0.35em] uppercase text-avo-flesh"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                {isShowreel ? 'Showreel 2023' : 'Now Playing'}
              </motion.span>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={activeVideo.id}
              className="text-[10px] font-body tracking-[0.2em] uppercase text-avo-dim max-w-[140px] md:max-w-xs text-right truncate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {isShowreel ? 'Commercial & Narrative' : activeVideo.title}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Large display title */}
        <div className="overflow-hidden mb-5 md:mb-8">
          <motion.h2
            className="text-[clamp(2.8rem,10vw,6rem)] font-display font-800 tracking-tight leading-[0.9] text-avo-cream"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Director<span className="text-avo-flesh">.</span>
          </motion.h2>
        </div>

        {/* Video player with cross-fade on change */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: videoY }}
        >
          <div className="video-container rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <AnimatePresence mode="wait">
              <motion.iframe
                key={activeVideo.id}
                src={activeVideo.embedSrc}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="mt-8 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <motion.div
            className="w-6 h-px bg-avo-dim origin-left"
            animate={{ scaleX: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[9px] font-body tracking-[0.35em] uppercase text-avo-dim">Scroll</span>
        </motion.div>

      </div>
    </section>
  )
}

// ─── Portfolio Grid ───────────────────────────────────────────────────────────

function PortfolioGrid({
  activeId,
  onSelect,
}: {
  activeId: string
  onSelect: (video: PortfolioVideo) => void
}) {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section className="py-12 md:py-20 px-5 md:px-6">
      <div className="max-w-7xl mx-auto">

        <div ref={headingRef} className="relative flex items-end justify-between mb-10">
          <div>
            <motion.p
              className="text-[9px] font-body tracking-[0.35em] uppercase text-avo-flesh mb-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Selected Works
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                className="text-3xl md:text-4xl font-display font-700 tracking-tight text-avo-cream leading-none"
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Portfolio
              </motion.h2>
            </div>
          </div>
          <motion.span
            className="text-[11px] font-body tracking-[0.2em] text-avo-dim tabular-nums pb-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {String(portfolioVideos.length).padStart(2, '0')} works
          </motion.span>
        </div>

        <motion.div
          className="h-px bg-avo-border mb-10 origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
          {portfolioVideos.map((video, index) => (
            <VideoCard
              key={video.id ?? video.url}
              video={video}
              index={index}
              isActive={activeId === (video.id ?? video.url)}
              onSelect={onSelect}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.footer
      ref={ref}
      className="relative py-10 px-6 border-t border-avo-border"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="text-[10px] font-body tracking-[0.15em] text-avo-dim">
          © {new Date().getFullYear()} Jordan Toia. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://vimeo.com/jordantoia"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="VIEW"
            className="text-[10px] font-body tracking-[0.2em] uppercase text-avo-dim hover:text-avo-flesh transition-colors duration-300"
          >
            Vimeo
          </a>
          <span className="w-px h-3 bg-avo-border" />
          <a
            href="mailto:jordan@zoomfilmtv.com.au"
            data-cursor="EMAIL"
            className="text-[10px] font-body tracking-[0.2em] uppercase text-avo-dim hover:text-avo-flesh transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </div>
    </motion.footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeVideo, setActiveVideo] = useState<ActiveVideo>(showreel)

  const handleSelect = useCallback((video: PortfolioVideo) => {
    const key = video.id ?? video.url
    const src = video.embedSrc
      ? video.embedSrc
      : buildEmbedSrc(video.id!, true)
    setActiveVideo({ id: key, title: video.title, embedSrc: src })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection activeVideo={activeVideo} />
      <PortfolioGrid activeId={activeVideo.id} onSelect={handleSelect} />
      <Footer />
      <script src="https://player.vimeo.com/api/player.js" async />
    </main>
  )
}
