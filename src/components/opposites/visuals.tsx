import { motion } from 'motion/react'
import type { ComponentType } from 'react'

/**
 * One animated scene per opposite word. Scenes loop gently so the card
 * communicates its meaning even before anyone speaks it.
 */

const spring = { duration: 2.6, repeat: Infinity, ease: 'easeInOut' as const }

/* ---------- open / shut ---------- */

function Door({ swing, times }: { swing: number[]; times: number[] }) {
  return (
    <div className="door-scene">
      <div className="door-frame">
        <motion.div
          className="door"
          style={{ transformOrigin: 'left center' }}
          animate={{ rotateY: swing }}
          transition={{ ...spring, times }}
        >
          <span className="door-knob" />
        </motion.div>
      </div>
    </div>
  )
}

function OpenVisual() {
  // Starts closed, swings open, holds open; cuts back to closed on restart.
  return <Door swing={[0, -100, -100, -100]} times={[0, 0.5, 0.85, 1]} />
}

function ShutVisual() {
  // Starts open, slams shut with a recoil, stays shut; cuts back on restart.
  return <Door swing={[-100, -100, 0, -8, 0]} times={[0, 0.32, 0.46, 0.56, 1]} />
}

/* ---------- big / small : pop into a clear size, no looping ---------- */

function PopCircle({ size }: { size: number }) {
  return (
    <motion.div
      className="big-circle"
      style={{ width: size, height: size }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 15 }}
    />
  )
}

function BigVisual() {
  return <PopCircle size={108} />
}

function SmallVisual() {
  return <PopCircle size={20} />
}

/* ---------- fast / slow : same track, constant speed, only pace differs ---------- */

function Racer({ duration, repeatDelay }: { duration: number; repeatDelay: number }) {
  return (
    <div className="track">
      <motion.div
        className="racer-ball"
        animate={{ x: [-80, 80] }}
        transition={{ duration, repeat: Infinity, repeatDelay, ease: 'linear' }}
      />
    </div>
  )
}

function FastVisual() {
  return <Racer duration={0.55} repeatDelay={0.55} />
}

function SlowVisual() {
  return <Racer duration={3.2} repeatDelay={0.5} />
}

/* ---------- up / down : one-way travel ---------- */

function UpVisual() {
  return (
    <div className="float-scene">
      <motion.div
        className="balloon"
        animate={{ y: [80, -120] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.9, ease: 'easeOut' }}
      >
        <span className="balloon-string" />
      </motion.div>
    </div>
  )
}

function DownVisual() {
  return (
    <div className="float-scene">
      <motion.div className="leaf-drop" animate={{ y: [-120, 80] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.9, ease: 'easeIn' }}>
        <span className="leaf leaf-spin" />
      </motion.div>
    </div>
  )
}

/* ---------- left / right : one-way crossing ---------- */

function Slider({ from, to }: { from: number; to: number }) {
  return (
    <div className="track">
      <motion.div
        className="slide-dot"
        animate={{ x: [from, to] }}
        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.7, ease: 'easeInOut' }}
      />
    </div>
  )
}

function LeftVisual() {
  return <Slider from={70} to={-70} />
}

function RightVisual() {
  return <Slider from={-70} to={70} />
}

/* ---------- hot / cold ---------- */

function HotVisual() {
  return (
    <div className="hot-scene">
      <div className="flame">
        <span className="flame-core" />
      </div>
    </div>
  )
}

function ColdVisual() {
  return (
    <div className="cold-scene">
      <svg className="snowflake" viewBox="0 0 64 64" aria-hidden>
        {[0, 60, 120].map((angle) => (
          <line key={angle} x1="32" y1="6" x2="32" y2="58" stroke="currentColor" strokeWidth="5" strokeLinecap="round" transform={`rotate(${angle} 32 32)`} />
        ))}
      </svg>
    </div>
  )
}

/* ---------- happy / sad ---------- */

function Face({ sad }: { sad?: boolean }) {
  return (
    <div className={'face' + (sad ? ' sad' : '')}>
      <span className="eye" />
      <span className="eye" />
      <span className="mouth" />
      {sad && <span className="tear" />}
    </div>
  )
}

function HappyVisual() {
  return <Face />
}

function SadVisual() {
  return <Face sad />
}

/* ---------- loud / quiet ---------- */

function Speaker({ loud }: { loud?: boolean }) {
  return (
    <div className={'speaker-scene' + (loud ? '' : ' quiet')}>
      <svg className="speaker-svg" viewBox="0 0 78 64" aria-hidden>
        <path className="speaker-body" d="M6 24v16h10l13 11V13L16 24H6Z" />
        {loud ? (
          <>
            <path className="arc a1" d="M38 25a9 9 0 0 1 0 14" />
            <path className="arc a2" d="M45 19a17 17 0 0 1 0 26" />
            <path className="arc a3" d="M52 13a26 26 0 0 1 0 38" />
          </>
        ) : (
          <path className="arc a1" d="M38 25a9 9 0 0 1 0 14" />
        )}
      </svg>
    </div>
  )
}

function LoudVisual() {
  return <Speaker loud />
}

function QuietVisual() {
  return <Speaker />
}

/* ---------- day / night ---------- */

function DayVisual() {
  return (
    <div className="day-scene">
      <div className="sun">
        <span className="sun-rays">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="ray" style={{ transform: `rotate(${i * 45}deg)` }} />
          ))}
        </span>
        <span className="sun-core" />
      </div>
    </div>
  )
}

function NightVisual() {
  return (
    <div className="night-scene">
      <span className="star s1" />
      <span className="star s2" />
      <span className="star s3" />
      <div className="moon" />
    </div>
  )
}

/* ---------- stop / go ---------- */

function StopVisual() {
  return (
    <div className="signal-scene">
      <motion.div className="stop-sign" animate={{ scale: [1, 1.1, 1] }} transition={{ ...spring, duration: 1.1 }} />
    </div>
  )
}

function GoVisual() {
  return (
    <div className="signal-scene">
      <div className="go-light">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="dash-dot"
            style={{ '--d': i * 0.25 } as React.CSSProperties}
            animate={{ x: [-16, 30], opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.25, ease: 'linear' }}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------- clean / dirty ---------- */

function CleanVisual() {
  return (
    <div className="clean-scene">
      <span className="bubble b1" />
      <span className="bubble b2" />
      <span className="bubble b3" />
      <div className="soap" />
    </div>
  )
}

function DirtyVisual() {
  return (
    <div className="dirty-scene">
      <motion.span className="fly" animate={{ rotate: 360 }} transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }} />
      <motion.span className="fly f2" animate={{ rotate: -360 }} transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }} />
      <div className="blob" />
    </div>
  )
}

/* ---------- peekaboo ---------- */

function PeekabooVisual() {
  return (
    <div className="peek-scene">
      <div className="peek-face">
        <span className="eye" />
        <span className="eye" />
      </div>
      <motion.span
        className="peek-hand left"
        animate={{ x: [-8, -8, 42, 42, -8] }}
        transition={{ ...spring, duration: 2.8, times: [0, 0.28, 0.45, 0.8, 1] }}
      />
      <motion.span
        className="peek-hand right"
        animate={{ x: [8, 8, -42, -42, 8] }}
        transition={{ ...spring, duration: 2.8, times: [0, 0.28, 0.45, 0.8, 1] }}
      />
    </div>
  )
}

function SeeYouVisual() {
  return (
    <div className="seeyou-scene">
      <motion.div
        className="see-eyes"
        animate={{ x: [-10, 10, -10] }}
        transition={{ ...spring, duration: 2, repeatType: 'mirror' }}
      >
        <span className="eye big" />
        <span className="eye big" />
      </motion.div>
    </div>
  )
}

/* ---------- registry ---------- */

export const PAIR_VISUALS: Record<string, [ComponentType, ComponentType]> = {
  'open-shut': [OpenVisual, ShutVisual],
  'big-small': [BigVisual, SmallVisual],
  'fast-slow': [FastVisual, SlowVisual],
  'up-down': [UpVisual, DownVisual],
  'left-right': [LeftVisual, RightVisual],
  'hot-cold': [HotVisual, ColdVisual],
  'happy-sad': [HappyVisual, SadVisual],
  'loud-quiet': [LoudVisual, QuietVisual],
  'day-night': [DayVisual, NightVisual],
  'stop-go': [StopVisual, GoVisual],
  'clean-dirty': [CleanVisual, DirtyVisual],
  peekaboo: [PeekabooVisual, SeeYouVisual]
}
