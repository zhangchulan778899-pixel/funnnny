import { useCallback, useEffect, useRef } from 'react'
import './BorderGlow.css'

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 40, s: 80, l: 80 }
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) }
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const opacities = [100, 60, 50, 40, 30, 20, 10]
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10']
  return Object.fromEntries(opacities.map((opacity, index) => [
    `--glow-color${keys[index]}`,
    `hsl(${base} / ${Math.min(opacity * intensity, 100)}%)`,
  ]))
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%']
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven']
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1]

function buildGradientVars(colors) {
  const vars = {}
  for (let index = 0; index < 7; index += 1) {
    const color = colors[Math.min(COLOR_MAP[index], colors.length - 1)]
    vars[GRADIENT_KEYS[index]] = `radial-gradient(at ${GRADIENT_POSITIONS[index]}, ${color} 0px, transparent 50%)`
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`
  return vars
}

function isLightColor(color) {
  const value = color.trim().replace('#', '')
  if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(value)) return false
  const hex = value.length === 3 ? value.split('').map((char) => char + char).join('') : value
  const red = parseInt(hex.slice(0, 2), 16)
  const green = parseInt(hex.slice(2, 4), 16)
  const blue = parseInt(hex.slice(4, 6), 16)
  return red * 0.2126 + green * 0.7152 + blue * 0.0722 > 180
}

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)
const easeInCubic = (x) => x * x * x

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const startAt = performance.now() + delay
  const tick = () => {
    const elapsed = performance.now() - startAt
    const progress = Math.min(elapsed / duration, 1)
    onUpdate(start + (end - start) * ease(progress))
    if (progress < 1) requestAnimationFrame(tick)
    else onEnd?.()
  }
  setTimeout(() => requestAnimationFrame(tick), delay)
}

export default function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
}) {
  const cardRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef(null)

  const handlePointerMove = useCallback((event) => {
    const card = cardRef.current
    if (!card || event.pointerType === 'touch') return
    pointerRef.current = { x: event.clientX, y: event.clientY }
    if (frameRef.current !== null) return
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null
      const currentCard = cardRef.current
      if (!currentCard) return
      const rect = currentCard.getBoundingClientRect()
      const x = pointerRef.current.x - rect.left
      const y = pointerRef.current.y - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const deltaX = x - centerX
      const deltaY = y - centerY
      const scaleX = deltaX === 0 ? Infinity : centerX / Math.abs(deltaX)
      const scaleY = deltaY === 0 ? Infinity : centerY / Math.abs(deltaY)
      const edge = Math.min(Math.max(1 / Math.min(scaleX, scaleY), 0), 1)
      let angle = deltaX === 0 && deltaY === 0 ? 0 : Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90
      if (angle < 0) angle += 360
      currentCard.style.setProperty('--edge-proximity', (edge * 100).toFixed(3))
      currentCard.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`)
    })
  }, [])

  useEffect(() => () => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!animated || !cardRef.current) return undefined
    const card = cardRef.current
    const angleStart = 110
    const angleEnd = 465
    card.classList.add('sweep-active')
    card.style.setProperty('--cursor-angle', `${angleStart}deg`)
    animateValue({ duration: 500, onUpdate: (value) => card.style.setProperty('--edge-proximity', value) })
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: (value) => card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (value / 100) + angleStart}deg`) })
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: (value) => card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (value / 100) + angleStart}deg`) })
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0, onUpdate: (value) => card.style.setProperty('--edge-proximity', value), onEnd: () => card.classList.remove('sweep-active') })
    return undefined
  }, [animated])

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card${isLightColor(backgroundColor) ? ' border-glow-card--light' : ''} ${className}`}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...buildGlowVars(glowColor, glowIntensity),
        ...buildGradientVars(colors),
      }}
    >
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}
