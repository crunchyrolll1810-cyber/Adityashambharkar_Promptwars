import React, { useEffect, useRef } from 'react'

interface Blob {
  x: number; y: number; vx: number; vy: number
  radius: number; color: [number, number, number]; alpha: number
}

/**
 * OFF+BRAND style fluid ink canvas.
 * 8 soft glowing blobs drift organically and attract toward the cursor,
 * creating the "ink dropped in water" opening effect from landonorris.com.
 */
export const FluidCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)
    const mouse = { x: W / 2, y: H / 2, active: false }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const palette: [number, number, number][] = [
      [210, 255, 0],   // volt
      [210, 255, 0],   // volt (weighted)
      [255, 128, 0],   // papaya
      [66, 133, 244],  // blue
      [160, 220, 0],   // volt-dim
    ]

    const blobs: Blob[] = Array.from({ length: 7 }, (_, i) => ({
      x: W * (0.15 + Math.random() * 0.7),
      y: H * (0.1 + Math.random() * 0.8),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 180 + Math.random() * 180,
      color: palette[i % palette.length],
      alpha: 0.055 + Math.random() * 0.04,
    }))

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true }
    const onLeave = () => { mouse.active = false }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    const render = () => {
      ctx.clearRect(0, 0, W, H)

      blobs.forEach((b) => {
        // Attraction to cursor
        if (mouse.active && !reduced) {
          const dx = mouse.x - b.x, dy = mouse.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 600) {
            const f = (1 - dist / 600) * 0.0012
            b.vx += dx * f; b.vy += dy * f
          }
        }

        // Ambient sine drift
        const t = Date.now() * 0.00018
        b.vx += Math.sin(t + b.radius) * 0.008
        b.vy += Math.cos(t + b.radius * 0.7) * 0.008

        // Dampen + move
        b.vx *= 0.978; b.vy *= 0.978
        b.x += b.vx; b.y += b.vy

        // Soft boundary bounce
        if (b.x < -b.radius) b.x = W + b.radius
        if (b.x > W + b.radius) b.x = -b.radius
        if (b.y < -b.radius) b.y = H + b.radius
        if (b.y > H + b.radius) b.y = -b.radius

        // Draw radial gradient blob
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius)
        const [r, gv, bl] = b.color
        g.addColorStop(0, `rgba(${r},${gv},${bl},${b.alpha})`)
        g.addColorStop(1, `rgba(${r},${gv},${bl},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
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
