/** Tiny WebAudio "pop" blips — no assets, synthesized on the fly. */

let ctx: AudioContext | null = null

/** Call from a user gesture once; creates/unlocks the shared AudioContext. */
export function unlockPop() {
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AC) ctx = new AC()
    }
    void ctx?.resume()
  } catch {
    ctx = null
  }
}

/** Plays one short pop. `when` is a delay in seconds (for staggered pops). */
export function pop(when = 0, pitch = 1) {
  if (!ctx || ctx.state !== 'running') return
  const t = ctx.currentTime + when
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(620 * pitch, t)
  osc.frequency.exponentialRampToValueAtTime(160 * pitch, t + 0.09)
  gain.gain.setValueAtTime(0.14, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1)
  osc.connect(gain).connect(ctx.destination)
  osc.start(t)
  osc.stop(t + 0.12)
}
