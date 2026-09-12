import { motion } from 'motion/react'
import type { ComponentType } from 'react'
import '../../styles/vehicles.css'

/**
 * One big animated vehicle per card, drawn from simple shapes in side view.
 * Every scene keeps a ground / road / water / pad line so the vehicle reads
 * instantly, even to a 20-month-old.
 *
 * Animation rules kept here: no `times` arrays at all (keyframe arrays of
 * equal length only), one-way travel (plane, rocket) restarts with a
 * repeatDelay, and idle motions (bouncing, spinning, rocking) loop freely.
 */

/* ---------- car : chunky red car, spinning wheels, suspension bounce ---------- */

function CarVisual() {
  return (
    <div className="veh-scene">
      <div className="veh-road" />
      <div className="veh-pos veh-pos-road">
        <motion.div
          className="veh-car"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="veh-car-cabin">
            <i className="veh-glass" />
            <i className="veh-glass" />
          </span>
          <span className="veh-car-body">
            <i className="veh-headlight" />
          </span>
          <span className="veh-wheel veh-wheel-a" />
          <span className="veh-wheel veh-wheel-b" />
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- train : green engine, smoke puffs, track rumble ---------- */

function TrainVisual() {
  return (
    <div className="veh-scene">
      <div className="veh-track" />
      <div className="veh-pos veh-pos-road">
        <motion.div
          className="veh-train"
          animate={{ x: [0, -1.5, 0, 1.5, 0] }}
          transition={{ duration: 0.42, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="veh-train-cab">
            <i className="veh-glass" />
          </span>
          <span className="veh-train-boiler" />
          <span className="veh-train-chimney" />
          <span className="veh-train-cow" />
          <span className="veh-smoke">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="veh-puff"
                initial={{ opacity: 0 }}
                animate={{ y: [-2, -72], x: [0, 10], scale: [0.45, 1.5], opacity: [0.9, 0] }}
                transition={{ duration: 1.9, repeat: Infinity, delay: i * 0.62, ease: 'easeOut' }}
              />
            ))}
          </span>
          <span className="veh-wheel veh-train-wheel-front" />
          <span className="veh-wheel veh-train-wheel-back" />
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- plane : crosses the sky one way, cloud drifts back ---------- */

function PlaneVisual() {
  return (
    <div className="veh-scene">
      <div className="veh-horizon" />
      <motion.span
        className="veh-cloud"
        animate={{ x: [175, -235] }}
        transition={{ duration: 7.5, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
      />
      <div className="veh-pos veh-pos-sky">
        <motion.div
          className="veh-plane-cross"
          animate={{ x: [-215, 215] }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
        >
          <motion.div
            className="veh-plane-bob"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="veh-plane">
              <span className="veh-plane-tail" />
              <span className="veh-plane-fuselage" />
              <span className="veh-plane-wing" />
              <i className="veh-glass veh-plane-cockpit" />
              <span className="veh-prop" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- boat : hull rocking on sine waves, flag flapping ---------- */

function BoatVisual() {
  return (
    <div className="veh-scene">
      <div className="veh-pos veh-pos-boat">
        <motion.div
          className="veh-boat"
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="veh-boat-mast" />
          <span className="veh-boat-flag" />
          <span className="veh-boat-cabin">
            <i className="veh-glass" />
          </span>
          <span className="veh-boat-hull" />
        </motion.div>
      </div>
      {/* Waves drawn after the boat so the hull dips into them. */}
      <span className="veh-wave veh-wave-2" />
      <span className="veh-wave veh-wave-1" />
    </div>
  )
}

/* ---------- bus : long yellow bus, windows, bounce, spinning wheels ---------- */

function BusVisual() {
  return (
    <div className="veh-scene">
      <div className="veh-road" />
      <div className="veh-pos veh-pos-road">
        <motion.div
          className="veh-bus"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.75, repeat: Infinity, ease: 'easeInOut' }}
        >
          <i className="veh-glass veh-bus-g1" />
          <i className="veh-glass veh-bus-g2" />
          <i className="veh-glass veh-bus-g3" />
          <i className="veh-glass veh-bus-g4" />
          <span className="veh-bus-door" />
          <span className="veh-bus-stripe" />
          <span className="veh-wheel veh-wheel-a" />
          <span className="veh-wheel veh-wheel-b" />
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- firetruck : flashing beacon, ladder, rolling wheels ---------- */

function FiretruckVisual() {
  return (
    <div className="veh-scene">
      <div className="veh-road" />
      <div className="veh-pos veh-pos-road">
        <motion.div
          className="veh-truck"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="veh-ladder" />
          <span className="veh-truck-body" />
          <span className="veh-truck-cab">
            <i className="veh-glass" />
          </span>
          <span className="veh-beacon" />
          <span className="veh-wheel veh-wheel-a" />
          <span className="veh-wheel veh-wheel-b" />
          <span className="veh-wheel veh-wheel-c" />
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- rocket : sits on the pad, flame flickers, launches one way ---------- */

function RocketVisual() {
  // y keyframes [0, 0, -330] are evenly spaced (no `times`): half the cycle
  // idling on the pad, half accelerating off the top of the card, then a
  // repeatDelay before it resets on the pad. Launch is strictly one-way.
  // The flame uses the identical transition so it stretches in sync.
  return (
    <div className="veh-scene">
      <div className="veh-pad-ground" />
      <div className="veh-pad" />
      <div className="veh-pos veh-pos-rocket">
        <motion.div
          className="veh-rocket-fly"
          animate={{ y: [0, 0, -330] }}
          transition={{ duration: 3.4, ease: ['linear', 'easeIn'], repeat: Infinity, repeatDelay: 1.1 }}
        >
          <div className="veh-rocket">
            <span className="veh-rocket-fin veh-rocket-fin-l" />
            <span className="veh-rocket-fin veh-rocket-fin-r" />
            <span className="veh-rocket-window" />
            <motion.span
              className="veh-flame"
              animate={{ scaleY: [1, 1, 1.6], scaleX: [1, 1, 0.9] }}
              transition={{ duration: 3.4, ease: ['linear', 'easeIn'], repeat: Infinity, repeatDelay: 1.1 }}
            >
              <i />
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- registry ---------- */

export const VEHICLES_VISUALS: Record<string, ComponentType> = {
  car: CarVisual,
  train: TrainVisual,
  plane: PlaneVisual,
  boat: BoatVisual,
  bus: BusVisual,
  firetruck: FiretruckVisual,
  rocket: RocketVisual
}
