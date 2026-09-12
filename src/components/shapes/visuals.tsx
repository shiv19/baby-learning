import { motion } from 'motion/react'
import type { ComponentType, CSSProperties } from 'react'
import '../../styles/shapes.css'

/**
 * One animated scene per shape. The shape itself is always the biggest thing
 * on the card and never fades away — accents (shadows, sparkles) may pulse.
 */

/* ---------- circle : a perfect circle, always round — a slow rolling spin ---------- */

function CircleVisual() {
  return (
    <div className="shp-scene">
      <div className="shp-stage shp-stage-center">
        <motion.div
          className="shp-ball"
          animate={{ rotate: 360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
        >
          <span className="shp-ball-shine" />
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- square : hops straight up, lands flat, settles, pauses ---------- */

function SquareVisual() {
  return (
    <div className="shp-scene">
      <div className="shp-stage shp-stage-center">
        <div className="shp-square" />
      </div>
    </div>
  )
}

/* ---------- triangle : drops onto its base, then wiggles point-up ---------- */

function TriangleVisual() {
  return (
    <div className="shp-scene">
      <div className="shp-stage shp-stage-center">
        <motion.div
          animate={{ y: [-150, 0, 0, 0, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: ['easeIn', 'easeOut', 'easeOut', 'easeOut']
          }}
        >
          <motion.div
            className="shp-triangle"
            style={{ transformOrigin: '50% 100%' }}
            animate={{ rotate: [0, 0, -11, 9, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: ['linear', 'easeInOut', 'easeInOut', 'easeInOut']
            }}
          >
            <svg className="shp-triangle-svg" viewBox="0 0 120 106" aria-hidden>
              <polygon points="60,12 110,92 10,92" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- star : slow spin while the points twinkle one after another ---------- */

// Outer radius 80, tips are separate polygons so each can pulse from the center.
const STAR_BASE =
  '100,20 121.2,70.9 176.1,75.3 134.2,111.1 147,164.7 100,136 53,164.7 65.8,111.1 23.9,75.3 78.8,70.9'

const STAR_TIPS = [
  '100,20 80.6,73.3 119.4,73.3',
  '176.1,75.3 119.4,73.3 131.4,110.2',
  '147,164.7 131.4,110.2 100,133',
  '53,164.7 100,133 68.6,110.2',
  '23.9,75.3 68.6,110.2 80.6,73.3'
]

function StarVisual() {
  return (
    <div className="shp-scene">
      <div className="shp-stage shp-stage-center">
        <motion.svg
          className="shp-star"
          viewBox="0 0 200 200"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          aria-hidden
        >
          <polygon className="shp-star-base" points={STAR_BASE} />
          {STAR_TIPS.map((pts, i) => (
            <polygon key={i} className="shp-star-tip" style={{ '--i': i } as CSSProperties} points={pts} />
          ))}
        </motion.svg>
      </div>
    </div>
  )
}

/* ---------- heart : thump-thump ... thump-thump ---------- */

function HeartVisual() {
  return (
    <div className="shp-scene">
      <div className="shp-stage shp-stage-center">
        <motion.svg
          className="shp-heart"
          viewBox="0 0 100 100"
          animate={{ scale: [1, 1.16, 1, 1.1, 1] }}
          transition={{ duration: 0.95, repeat: Infinity, repeatDelay: 0.85, ease: 'easeInOut' }}
          aria-hidden
        >
          <path
            className="shp-heart-body"
            d="M50 88 C22 66 8 47 8 31 C8 16 19 7 32 7 C40 7 47 11.5 50 19 C53 11.5 60 7 68 7 C81 7 92 16 92 31 C92 47 78 66 50 88 Z"
          />
          <ellipse className="shp-heart-shine" cx="32" cy="30" rx="9" ry="5.5" transform="rotate(-24 32 30)" />
        </motion.svg>
      </div>
    </div>
  )
}

/* ---------- diamond : a gem with a sweeping glint and sparkles ---------- */

function DiamondVisual() {
  return (
    <div className="shp-scene">
      <div className="shp-stage shp-stage-center">
        <span className="shp-spark shp-spark-a" />
        <span className="shp-spark shp-spark-b" />
        <span className="shp-spark shp-spark-c" />
        <svg className="shp-gem" viewBox="0 0 200 170" aria-hidden>
          <defs>
            <clipPath id="shp-gem-clip">
              <path d="M60 24 L140 24 L182 66 L100 160 L18 66 Z" />
            </clipPath>
            <linearGradient id="shp-glint-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="shp-gem-body" d="M60 24 L140 24 L182 66 L100 160 L18 66 Z" />
          <path className="shp-gem-table" d="M60 24 L140 24 L114 66 L86 66 Z" />
          <g clipPath="url(#shp-gem-clip)">
            {/* Light streak sweeps one way across the gem, then rests and restarts. */}
            <motion.rect
              fill="url(#shp-glint-grad)"
              x={-70}
              y={-40}
              width={34}
              height={250}
              animate={{ x: [-45, 200] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.7, ease: 'easeInOut' }}
            />
          </g>
          <path
            className="shp-gem-facets"
            d="M60 24 L86 66 M100 24 L100 66 M140 24 L114 66 M86 66 L100 160 M114 66 L100 160 M18 66 L182 66"
          />
        </svg>
      </div>
    </div>
  )
}

/* ---------- moon : a crescent rocking gently under tiny stars ---------- */

function MoonVisual() {
  return (
    <div className="shp-scene">
      <div className="shp-stage shp-stage-center">
        <span className="shp-spark shp-spark-d" />
        <span className="shp-spark shp-spark-e" />
        <span className="shp-spark shp-spark-f" />
        <svg className="shp-moon" viewBox="0 0 200 200" aria-hidden>
          <defs>
            <mask id="shp-moon-mask">
              <rect width="200" height="200" fill="#ffffff" />
              <circle cx="140" cy="80" r="72" fill="#000000" />
            </mask>
          </defs>
          <g mask="url(#shp-moon-mask)">
            <circle className="shp-moon-body" cx="100" cy="100" r="85" />
            <circle className="shp-moon-crater" cx="58" cy="78" r="10" />
            <circle className="shp-moon-crater" cx="42" cy="116" r="7" />
            <circle className="shp-moon-crater" cx="72" cy="148" r="6" />
          </g>
        </svg>
      </div>
    </div>
  )
}

/* ---------- registry ---------- */

export const SHAPES_VISUALS: Record<string, ComponentType> = {
  circle: CircleVisual,
  square: SquareVisual,
  triangle: TriangleVisual,
  star: StarVisual,
  heart: HeartVisual,
  diamond: DiamondVisual,
  moon: MoonVisual
}
