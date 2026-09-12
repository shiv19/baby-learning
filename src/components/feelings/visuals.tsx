import { motion } from 'motion/react'
import type { ComponentType } from 'react'
import '../../styles/feelings.css'

/**
 * One big expressive face per feeling. Every scene is an ambient loop so the
 * card keeps emoting; small features (tears, z's, hearts) cycle endlessly
 * rather than playing once and vanishing.
 */

const loop = (duration: number) => ({ duration, repeat: Infinity, ease: 'easeInOut' as const })

/* ---------- happy : bouncing, squinty-eyed, huge grin ---------- */

function HappyVisual() {
  return (
    <div className="fee-scene">
      <motion.div className="fee-face fee-joy" animate={{ y: [0, -16, 0] }} transition={loop(1.1)}>
        <span className="fee-eye-arc-l" />
        <span className="fee-eye-arc-r" />
        <span className="fee-blush fee-blush-l" />
        <span className="fee-blush fee-blush-r" />
        <div className="fee-grin">
          <span className="fee-grin-tongue" />
        </div>
      </motion.div>
    </div>
  )
}

/* ---------- sad : heavy lids, downturned mouth, sliding tear ---------- */

function SadVisual() {
  return (
    <div className="fee-scene">
      <motion.div
        className="fee-face fee-sad"
        animate={{ y: [0, 8, 0], rotate: [0, -2.5, 0] }}
        transition={loop(3)}
      >
        <span className="fee-brow fee-brow-l" />
        <span className="fee-brow fee-brow-r" />
        <span className="fee-eye-droop-l" />
        <span className="fee-eye-droop-r" />
        <div className="fee-frown" />
        <span className="fee-tear" />
      </motion.div>
    </div>
  )
}

/* ---------- sleepy : nodding head, big slow yawn, floating z's ---------- */

function SleepyVisual() {
  return (
    <div className="fee-scene">
      <motion.div className="fee-face fee-sleepy" animate={{ rotate: [0, 3, 0, -3, 0] }} transition={loop(5)}>
        <span className="fee-eye-closed-l" />
        <span className="fee-eye-closed-r" />
        <motion.div
          className="fee-yawn"
          animate={{ scaleY: [0.16, 1, 1, 0.16] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      <span className="fee-z fee-z1">z</span>
      <span className="fee-z fee-z2">z</span>
      <span className="fee-z fee-z3">Z</span>
    </div>
  )
}

/* ---------- surprised : round eyes, O mouth, recoil then lean in ---------- */

function SurprisedVisual() {
  return (
    <div className="fee-scene">
      <motion.div
        className="fee-face fee-wow"
        animate={{ scale: [1, 0.86, 1.12, 1], rotate: [0, -3, 2, 0] }}
        transition={loop(2.2)}
      >
        <span className="fee-brow-up-l" />
        <span className="fee-brow-up-r" />
        <span className="fee-eye-wide-l" />
        <span className="fee-eye-wide-r" />
        <div className="fee-oh" />
      </motion.div>
    </div>
  )
}

/* ---------- silly : wobbling head, wonky eyes, waggling tongue ---------- */

function SillyVisual() {
  return (
    <div className="fee-scene">
      <motion.div className="fee-face fee-silly" animate={{ rotate: [-9, 9, -9] }} transition={loop(1.5)}>
        <span className="fee-eye-wonky-l">
          <span className="fee-pupil fee-pupil-l" />
        </span>
        <span className="fee-eye-wonky-r">
          <span className="fee-pupil fee-pupil-r" />
        </span>
        <div className="fee-silly-mouth">
          <span className="fee-tongue-out" />
        </div>
      </motion.div>
    </div>
  )
}

/* ---------- angry : red face, V brows, gritted teeth, shaking ---------- */

function AngryVisual() {
  return (
    <div className="fee-scene">
      <motion.div
        className="fee-face fee-mad"
        animate={{ x: [0, -3, 3, -3, 3, 0], rotate: [0, -1.2, 1.2, -1.2, 1.2, 0] }}
        transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
      >
        <span className="fee-brow fee-brow-l" />
        <span className="fee-brow fee-brow-r" />
        <span className="fee-eye-mad-l" />
        <span className="fee-eye-mad-r" />
        <div className="fee-grit" />
      </motion.div>
    </div>
  )
}

/* ---------- loved : heart eyes, warm smile, hearts floating up ---------- */

function LovedVisual() {
  return (
    <div className="fee-scene">
      <motion.div className="fee-face fee-loved" animate={{ rotate: [-3, 3, -3] }} transition={loop(2.4)}>
        <span className="fee-heart-eye fee-heart-eye-l" />
        <span className="fee-heart-eye fee-heart-eye-r" />
        <span className="fee-blush fee-blush-l" />
        <span className="fee-blush fee-blush-r" />
        <div className="fee-warm-smile" />
      </motion.div>
      <span className="fee-float-heart fee-fh1" />
      <span className="fee-float-heart fee-fh2" />
      <span className="fee-float-heart fee-fh3" />
    </div>
  )
}

/* ---------- registry ---------- */

export const FEELINGS_VISUALS: Record<string, ComponentType> = {
  happy: HappyVisual,
  sad: SadVisual,
  sleepy: SleepyVisual,
  surprised: SurprisedVisual,
  silly: SillyVisual,
  angry: AngryVisual,
  loved: LovedVisual
}
