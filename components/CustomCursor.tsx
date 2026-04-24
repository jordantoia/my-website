'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHoveringLink, setIsHoveringLink] = useState(false)
  const [label, setLabel] = useState('')

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  // Ring lags behind
  const ringX = useSpring(rawX, { stiffness: 300, damping: 35 })
  const ringY = useSpring(rawY, { stiffness: 300, damping: 35 })

  const isTouchDevice = useRef(false)

  useEffect(() => {
    isTouchDevice.current = window.matchMedia('(hover: none)').matches
    if (isTouchDevice.current) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a, button, [data-cursor]')
      if (link) {
        setIsHoveringLink(true)
        setLabel(link.getAttribute('data-cursor') ?? '')
      }
    }

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor]')) {
        setIsHoveringLink(false)
        setLabel('')
      }
    }

    const onMouseLeaveWindow = () => setIsVisible(false)
    const onMouseEnterWindow = () => setIsVisible(true)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow)
    document.documentElement.addEventListener('mouseenter', onMouseEnterWindow)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveWindow)
      document.documentElement.removeEventListener('mouseenter', onMouseEnterWindow)
    }
  }, [isVisible, rawX, rawY])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <>
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHoveringLink ? 64 : 36,
          height: isHoveringLink ? 64 : 36,
          opacity: isVisible ? 1 : 0,
          borderColor: isHoveringLink ? 'rgba(184,212,106,0.7)' : 'rgba(226,233,204,0.35)',
        }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {label ? (
          <motion.span
            className="text-[9px] font-body tracking-widest uppercase text-avo-flesh"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHoveringLink ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        ) : null}
      </motion.div>
    </>
  )
}
