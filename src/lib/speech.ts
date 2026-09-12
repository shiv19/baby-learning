/** Web Speech wrapper: picks the friendliest available voice and never overlaps. */

import { getNarration } from './settings'

let cachedVoice: SpeechSynthesisVoice | null | undefined

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice !== undefined) return cachedVoice
  if (!('speechSynthesis' in window)) return (cachedVoice = null)

  const voices = speechSynthesis.getVoices()
  if (voices.length === 0) return null // voices not loaded yet; retry next call

  const byName = (fragments: string[]) =>
    voices.find((v) => fragments.some((f) => v.name.includes(f)))

  // High-quality built-in voices first, then any local English voice.
  cachedVoice =
    byName(['Neural', 'Enhanced', 'Premium', 'Samantha', 'Ava', 'Zoe', 'Allison', 'Karen']) ??
    voices.find((v) => v.localService && v.lang.startsWith('en')) ??
    voices.find((v) => v.lang.startsWith('en')) ??
    voices[0]
  return cachedVoice
}

// Voice list loads asynchronously on some platforms; drop the cache when it does.
if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = () => {
    cachedVoice = undefined
  }
}

export function cancelSpeech() {
  // Invalidate any pending speakSequence and stop current playback.
  newestRun++
  if ('speechSynthesis' in window) speechSynthesis.cancel()
}

function utter(text: string, voice: SpeechSynthesisVoice | null): Promise<void> {
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.8
    u.pitch = 1.1
    if (voice) u.voice = voice
    // onend can be swallowed after cancel(); resolve via either path.
    u.onend = () => resolve()
    u.onerror = () => resolve()
    speechSynthesis.speak(u)
  })
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

// Only the newest started sequence may speak; anything older goes silent.
let newestRun = 0

/**
 * Speaks a sequence of phrases, canceling anything in flight.
 * `onPhraseStart` fires as each phrase begins, so the UI can highlight
 * whatever is being spoken. Resolves early if superseded.
 */
export async function speakSequence(
  phrases: string[],
  onPhraseStart?: (index: number) => void
) {
  // Narration off: parents tell the story themselves; silence everything.
  if (!getNarration()) return
  const run = ++newestRun
  // Cancel in-flight playback without invalidating our own run token.
  speechSynthesis.cancel()
  // Small delay lets cancel() settle before the new utterance starts.
  await wait(60)
  for (let i = 0; i < phrases.length; i++) {
    if (run !== newestRun) return
    if (phrases[i]) {
      onPhraseStart?.(i)
      await utter(phrases[i], pickVoice())
      await wait(250)
    }
  }
}
