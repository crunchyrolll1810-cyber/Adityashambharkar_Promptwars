import React, { useEffect, useRef } from 'react'

export const InteractiveDotGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const SPACING = 24
    const RADIUS = 140
    const MAX_PULL = 10

    const onResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
    }

    const onMouseLeave = () => {
      mouse.targetX = -1000
      mouse.targetY = -1000
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Lerp mouse coordinates for soft spring dampening
      mouse.x += (mouse.targetX - mouse.x) * 0.12
      mouse.y += (mouse.targetY - mouse.y) * 0.12

      const cols = Math.ceil(width / SPACING) + 1
      const rows = Math.ceil(height / SPACING) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * SPACING
          const oy = r * SPACING
          let x = ox
          let y = oy
          let dotRadius = 1.2
          let color = 'rgba(51, 65, 85, 0.25)' // slate-700 at 25%

          if (!reducedMotion && mouse.x > -500) {
            const dx = mouse.x - ox
            const dy = mouse.y - oy
            const dist = Math.hypot(dx, dy)

            if (dist < RADIUS) {
              const factor = 1 - dist / RADIUS
              const pull = factor * MAX_PULL
              const angle = Math.atan2(dy, dx)
              x = ox + Math.cos(angle) * pull
              y = oy + Math.sin(angle) * pull
              dotRadius = 1.2 + factor * 1.6

              const alpha = 0.25 + factor * 0.7
              color = factor > 0.4 ? `rgba(210, 255, 0, ${alpha})` : `rgba(255, 128, 0, ${alpha * 0.85})`
            }
          }

          ctx.beginPath()
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-20 w-full h-full"
      aria-hidden="true"
    />
  )
}
