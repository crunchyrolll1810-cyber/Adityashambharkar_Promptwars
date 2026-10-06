import { useEffect } from 'react'

/**
 * Scroll reveal hook using IntersectionObserver.
 * Elements with [data-reveal] start hidden (clip-path + translateY).
 * Once they enter the viewport, the `is-revealed` class is added,
 * triggering the CSS transition defined in index.css.
 * Optional [data-reveal-delay="400"] (ms) staggers grouped items.
 */
export function useScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-revealed')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = parseInt(el.dataset.revealDelay ?? '0', 10)
            setTimeout(() => el.classList.add('is-revealed'), delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
