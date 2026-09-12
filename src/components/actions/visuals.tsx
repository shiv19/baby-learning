import { motion } from 'motion/react'
import type { ComponentType, ReactNode } from 'react'
import '../../styles/actions.css'

/**
 * "Copy me" action scenes. Every card shows the same round-headed kid doing
 * one imitable action — big, simple, and looped so a toddler can watch a full
 * cycle and copy it with their body.
 *
 * Timing: rhythmic actions (clap, wave, stomp, march) loop freely; one-way
 * actions (jump, spin) play once per cycle and pause via repeatDelay. Impact
 * effects (spark, rings, dust) are phase-locked to their action by giving them
 * the same total cycle length (delay + duration + repeatDelay = action period)
 * instead of `times` keyframes, so every animation stays keyframe-safe.
 */

/* ---------- the kid : round head, mitten hands and feet ---------- */

function Kid({ pose, arms, legs, eyes = 'open' }: { pose: string; arms?: ReactNode; legs?: ReactNode; eyes?: 'open' | 'closed' }) {
  return (
    <div className={`act-kid act-kid-${pose}${eyes === 'closed' ? ' act-kid-asleep' : ''}`}>
      <div className="act-kid-head">
        <span className="act-kid-hair" />
        <span className="act-kid-eye act-eye-l" />
        <span className="act-kid-eye act-eye-r" />
        <span className="act-kid-cheek act-cheek-l" />
        <span className="act-kid-cheek act-cheek-r" />
        <span className="act-kid-mouth" />
      </div>
      <div className="act-kid-body" />
      {legs ?? (
        <>
          <span className="act-kid-leg act-leg-l">
            <span className="act-kid-foot" />
          </span>
          <span className="act-kid-leg act-leg-r">
            <span className="act-kid-foot" />
          </span>
        </>
      )}
      {arms ?? (
        <>
          <span className="act-kid-arm act-arm-l">
            <span className="act-kid-hand" />
          </span>
          <span className="act-kid-arm act-arm-r">
            <span className="act-kid-hand" />
          </span>
        </>
      )}
    </div>
  )
}

/* ---------- clap : hands face each other, meet, spark burst ---------- */

function ClapVisual() {
  return (
    <div className="act-scene act-floor act-clap">
      <div className="act-ground" />
      <Kid
        pose="clap"
        arms={
          <>
            <motion.span className="act-kid-arm act-clap-arm act-clap-l" animate={{ x: [-30, 0, 0, -30] }} transition={{ duration: 0.95, repeat: Infinity, ease: 'easeInOut' }}>
              <span className="act-kid-hand" />
            </motion.span>
            <motion.span className="act-kid-arm act-clap-arm act-clap-r" animate={{ x: [30, 0, 0, 30] }} transition={{ duration: 0.95, repeat: Infinity, ease: 'easeInOut' }}>
              <span className="act-kid-hand" />
            </motion.span>
            {/* Spark pops right as the palms meet, 0.3s into the 0.95s clap loop. */}
            <motion.div className="act-clap-spark" animate={{ scale: [0.3, 1.2, 0.4], opacity: [0, 1, 0] }} transition={{ duration: 0.32, delay: 0.3, repeat: Infinity, repeatDelay: 0.63, ease: 'easeOut' }}>
              <svg viewBox="0 0 54 54" aria-hidden>
                {[0, 60, 120, 180, 240, 300].map((a) => (
                  <line key={a} x1="27" y1="5" x2="27" y2="14" stroke="#f2a13c" strokeWidth="5" strokeLinecap="round" transform={`rotate(${a} 27 27)`} />
                ))}
              </svg>
            </motion.div>
          </>
        }
      />
    </div>
  )
}

/* ---------- jump : squat, leap up, land, settle, pause, repeat ---------- */

function JumpVisual() {
  return (
    <div className="act-scene act-floor">
      <div className="act-ground" />
      {/* One-directional cycle: squat (squash), leap (stretch), land, settle, then pause. */}
      <motion.div
        className="act-jump-kid"
        animate={{ y: [0, 10, -68, 0, 3, 0], scaleX: [1, 1.16, 0.94, 1.08, 0.98, 1], scaleY: [1, 0.84, 1.1, 0.9, 1.03, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.9, ease: ['easeInOut', 'easeOut', 'easeIn', 'easeOut', 'easeOut'] }}
      >
        <Kid pose="jump" />
      </motion.div>
      {/* Dust kicks up at the landing moment, 0.84s into the 2.3s cycle. */}
      <motion.span className="act-jump-dust act-jump-dust-l" animate={{ x: [0, -16], scale: [0.5, 1.5], opacity: [0.9, 0] }} transition={{ duration: 0.38, delay: 0.8, repeat: Infinity, repeatDelay: 1.92, ease: 'easeOut' }} />
      <motion.span className="act-jump-dust act-jump-dust-r" animate={{ x: [0, 16], scale: [0.5, 1.5], opacity: [0.9, 0] }} transition={{ duration: 0.38, delay: 0.86, repeat: Infinity, repeatDelay: 1.92, ease: 'easeOut' }} />
    </div>
  )
}

/* ---------- wave : raised arm, waving forearm, friendly head tilt ---------- */

function WaveVisual() {
  return (
    <div className="act-scene act-floor act-wave">
      <div className="act-ground" />
      <Kid
        pose="wave"
        arms={
          <>
            <span className="act-kid-arm act-arm-l">
              <span className="act-kid-hand" />
            </span>
            <span className="act-wave-upper" />
            <motion.span className="act-wave-fore" animate={{ rotate: [-24, 24, -24] }} transition={{ duration: 0.75, repeat: Infinity, ease: 'easeInOut' }}>
              <span className="act-kid-hand" />
            </motion.span>
          </>
        }
      />
    </div>
  )
}

/* ---------- stomp : feet take turns lifting and slamming ---------- */

const STOMP_PERIOD = 1.6

function StompLeg({ side, delay }: { side: 'l' | 'r'; delay: number }) {
  const lift = side === 'l' ? 42 : -42
  return (
    <motion.span className={`act-kid-leg act-stomp-leg act-leg-${side}`} animate={{ rotate: [0, lift, lift * 0.8, 0] }} transition={{ duration: 0.7, delay, repeat: Infinity, repeatDelay: STOMP_PERIOD - 0.7, ease: ['easeOut', 'easeInOut', 'easeIn'] }}>
      <span className="act-kid-foot" />
    </motion.span>
  )
}

function StompRing({ side, delay }: { side: 'l' | 'r'; delay: number }) {
  return (
    <motion.span className={`act-stomp-ring act-ring-${side}`} animate={{ scale: [0.35, 1.5], opacity: [0.9, 0] }} transition={{ duration: 0.45, delay, repeat: Infinity, repeatDelay: STOMP_PERIOD - 0.45, ease: 'easeOut' }} />
  )
}

function StompDust({ cls, drift, delay }: { cls: string; drift: number; delay: number }) {
  return (
    <motion.span
      className={'act-stomp-dust ' + cls}
      animate={{ x: [0, drift], y: [0, -9], scale: [0.6, 1.3], opacity: [0.85, 0] }}
      transition={{ duration: 0.5, delay, repeat: Infinity, repeatDelay: STOMP_PERIOD - 0.5, ease: 'easeOut' }}
    />
  )
}

function StompVisual() {
  return (
    <div className="act-scene act-floor">
      <div className="act-ground" />
      <Kid
        pose="stomp"
        legs={
          <>
            {/* Left foot slams at 0.7s, right foot at 1.5s of the 1.6s cycle. */}
            <StompLeg side="l" delay={0} />
            <StompLeg side="r" delay={0.8} />
            <StompRing side="l" delay={0.64} />
            <StompRing side="r" delay={1.44} />
            <StompDust cls="act-dust-a" drift={-18} delay={0.6} />
            <StompDust cls="act-dust-b" drift={16} delay={0.62} />
            <StompDust cls="act-dust-c" drift={18} delay={1.4} />
            <StompDust cls="act-dust-d" drift={-16} delay={1.42} />
          </>
        }
      />
    </div>
  )
}

/* ---------- spin : full 360° in place, speed streaks, pause ---------- */

function SpinVisual() {
  return (
    <div className="act-scene act-floor">
      <div className="act-ground" />
      <motion.span className="act-spin-streak act-streak-l" animate={{ opacity: [0, 0.55, 0] }} transition={{ duration: 1.15, delay: 0.1, repeat: Infinity, repeatDelay: 1.15, ease: 'easeInOut' }}>
        <svg viewBox="0 0 42 140" aria-hidden>
          <path d="M34 8 C 8 40, 8 100, 34 132" />
        </svg>
      </motion.span>
      <motion.span className="act-spin-streak act-streak-r" animate={{ opacity: [0, 0.55, 0] }} transition={{ duration: 1.15, delay: 0.1, repeat: Infinity, repeatDelay: 1.15, ease: 'easeInOut' }}>
        <svg viewBox="0 0 42 140" aria-hidden>
          <path d="M8 8 C 34 40, 34 100, 8 132" />
        </svg>
      </motion.span>
      {/* One full Y-axis pirouette per cycle (period 2.3s), ending front-facing, then a pause. */}
      <motion.div
        className="act-spin-kid"
        style={{ transformPerspective: 600 }}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 1.25, repeat: Infinity, repeatDelay: 1.05, ease: 'easeInOut' }}
      >
        <Kid pose="spin" />
      </motion.div>
    </div>
  )
}

/* ---------- march : stepping in place, opposite arm swings ---------- */

function MarchVisual() {
  return (
    <div className="act-scene act-floor">
      <div className="act-ground" />
      <motion.div className="act-march-kid" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}>
        <Kid
          pose="march"
          arms={
            <>
              <motion.span className="act-kid-arm act-march-arm act-arm-l" animate={{ rotate: [18, -24, 18] }} transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}>
                <span className="act-kid-hand" />
              </motion.span>
              <motion.span className="act-kid-arm act-march-arm act-arm-r" animate={{ rotate: [-18, 24, -18] }} transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}>
                <span className="act-kid-hand" />
              </motion.span>
            </>
          }
          legs={
            <>
              <motion.span className="act-kid-leg act-march-leg act-leg-l" animate={{ y: [0, -16, 0], rotate: [8, -6, 8] }} transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}>
                <span className="act-kid-foot" />
              </motion.span>
              <motion.span className="act-kid-leg act-march-leg act-leg-r" animate={{ y: [-16, 0, -16], rotate: [-8, 6, -8] }} transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}>
                <span className="act-kid-foot" />
              </motion.span>
            </>
          }
        />
      </motion.div>
    </div>
  )
}

/* ---------- sleep : lying down, breathing, floating Z z z ---------- */

function SleepVisual() {
  return (
    <div className="act-scene act-sleep">
      <span className="act-sleep-moon" />
      <span className="act-sleep-star act-star-1" />
      <span className="act-sleep-star act-star-2" />
      <span className="act-sleep-star act-star-3" />
      <div className="act-sleep-group">
        <span className="act-sleep-pillow" />
        <div className="act-sleep-kid">
          <Kid
            pose="sleep"
            eyes="closed"
            // Arms are tucked under the blanket.
            arms={<></>}
            legs={
              <>
                <span className="act-kid-leg act-sleep-leg act-sleep-leg-a">
                  <span className="act-kid-foot" />
                </span>
                <span className="act-kid-leg act-sleep-leg act-sleep-leg-b">
                  <span className="act-kid-foot" />
                </span>
              </>
            }
          />
        </div>
        <span className="act-sleep-blanket" />
        <span className="act-sleep-z act-z1">Z</span>
        <span className="act-sleep-z act-z2">z</span>
        <span className="act-sleep-z act-z3">z</span>
      </div>
    </div>
  )
}

/* ---------- registry ---------- */

export const ACTIONS_VISUALS: Record<string, ComponentType> = {
  clap: ClapVisual,
  jump: JumpVisual,
  wave: WaveVisual,
  stomp: StompVisual,
  spin: SpinVisual,
  march: MarchVisual,
  sleep: SleepVisual
}
