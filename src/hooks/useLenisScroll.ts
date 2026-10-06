import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Initialises Lenis smooth scroll.
 * The rAF loop is driven inside this hook — no external ticker needed.
 * Returns a ref to the Lenis instance for optional scroll progress access.
 */
export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    })

    lenisRef.current = lenis

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return lenisRef
}
