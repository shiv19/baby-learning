/** Parent-controlled app settings, persisted in localStorage. */

const NARRATION_KEY = 'baby-learning.narration'

let narrationOn = localStorage.getItem(NARRATION_KEY) !== 'off'

const listeners = new Set<() => void>()

export function getNarration() {
  return narrationOn
}

export function setNarration(on: boolean) {
  narrationOn = on
  localStorage.setItem(NARRATION_KEY, on ? 'on' : 'off')
  listeners.forEach((l) => l())
}

export function subscribeNarration(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}
