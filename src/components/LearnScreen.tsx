import { useEffect, useMemo, useRef, useState } from 'react'
import type { ComponentType } from 'react'
import { itemsForMode } from '../data/learning'
import type { LearnItem, LearnMode, VisualItem } from '../data/learning'
import { cancelSpeech, speakSequence } from '../lib/speech'
import { pop, unlockPop } from '../lib/pop'
import { ACTIONS_VISUALS } from './actions/visuals'
import { FEELINGS_VISUALS } from './feelings/visuals'
import { SHAPES_VISUALS } from './shapes/visuals'
import { VEHICLES_VISUALS } from './vehicles/visuals'

interface Props {
  mode: LearnMode
  onHome: () => void
}

const AUTO_PLAY_MS = 4000
const CONFETTI_EMOJI = ['🎉', '⭐', '✨', '🎈', '🍎']

/** Scene registries for the single-card categories. */
const MODE_VISUALS: Partial<Record<LearnMode, Record<string, ComponentType>>> = {
  shapes: SHAPES_VISUALS,
  actions: ACTIONS_VISUALS,
  feelings: FEELINGS_VISUALS,
  vehicles: VEHICLES_VISUALS
}

export default function LearnScreen({ mode, onHome }: Props) {
  const items = itemsForMode(mode)
  const [index, setIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [speakingCard, setSpeakingCard] = useState<'main' | 'word' | null>(null)
  // Count-along: which apple the voice is currently on, or null when idle.
  const [countIndex, setCountIndex] = useState<number | null>(null)
  // Confetti burst id; 0 means off.
  const [confetti, setConfetti] = useState(0)
  const autoRef = useRef(autoPlay)
  autoRef.current = autoPlay
  const speechRun = useRef(0)
  // Resolves when the most recent speech sequence (slide speech, count-along,
  // …) finishes; autoplay waits on this before advancing.
  const speechDone = useRef<Promise<void>>(Promise.resolve())
  const item = items[index]

  const isColor = mode === 'colors'
  const isNumber = mode === 'numbers'
  const isLettersMode = mode === 'letters'
  const letterItem = isLettersMode ? (item as { letter: string }) : null
  const emojiItem = item as { emoji: string }
  const SingleVisual = MODE_VISUALS[mode]?.[(item as VisualItem).id]

  // Speaks phrase→card pairs, highlighting whichever card is being spoken.
  const speakPairs = (pairs: Array<{ text: string; card: 'main' | 'word' | 'count'; apple?: number }>) => {
    const run = ++speechRun.current
    setSpeakingCard(null)
    setCountIndex(null)
    speechDone.current = speakSequence(pairs.map((p) => p.text), (i) => {
      const pair = pairs[i]
      if (pair.card === 'count') setCountIndex(pair.apple ?? i)
      else setSpeakingCard(pair.card)
    }).then(() => {
      if (speechRun.current === run) {
        setSpeakingCard(null)
        setCountIndex(null)
      }
    })
  }

  const speak = (it: LearnItem) => {
    if (mode === 'letters') {
      speakPairs([
        { text: it.word === 'Ice cream' ? 'i' : it.main.toLowerCase(), card: 'main' },
        { text: it.word, card: 'word' }
      ])
    } else {
      const phrases = [{ text: it.word, card: 'main' as const }]
      const say = (it as VisualItem).say
      if (say) phrases.push({ text: say, card: 'main' as const })
      speakPairs(phrases)
    }
  }

  const speakPart = (part: 'main' | 'word' | 'both') => {
    unlockPop()
    if (mode === 'letters') {
      const letter = letterItem!.letter.toLowerCase()
      speakPairs(
        part === 'main'
          ? [{ text: letter, card: 'main' }]
          : part === 'word'
            ? [{ text: item.word, card: 'word' }]
            : [
                { text: letter, card: 'main' },
                { text: item.word, card: 'word' }
              ]
      )
    } else {
      const phrases = [{ text: item.word, card: 'main' as const }]
      const say = (item as VisualItem).say
      if (say) phrases.push({ text: say, card: 'main' as const })
      speakPairs(phrases)
    }
  }

  // Count-along: tap apple `n` and the voice counts every apple up to it,
  // bouncing each in turn.
  const countAlong = (n: number) => {
    unlockPop()
    speakPairs(
      Array.from({ length: n + 1 }, (_, i) => ({ text: items[i].word, card: 'count' as const, apple: i }))
    )
  }

  const go = (delta: number) => {
    cancelSpeech()
    unlockPop()
    const next = (index + delta + items.length) % items.length
    setIndex(next)
    // With autoplay off, navigation itself announces the new item.
    if (!autoRef.current) speak(items[next])
  }

  // Party when the last number (20) is reached.
  useEffect(() => {
    if (isNumber && index === items.length - 1) setConfetti((c) => c + 1)
  }, [index, isNumber, items.length])

  // Apple pop sounds, staggered to match the apples' entrance animation.
  useEffect(() => {
    if (!isNumber) return
    const n = (item as { number: number }).number
    for (let i = 0; i < n; i++) pop(0.05 + i * 0.07, 1 + (i % 4) * 0.12)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isNumber])

  // Announce the first item on entry — the tap that opened this mode is the
  // gesture that unlocks speech synthesis on mobile. If autoplay is on, the
  // effect below already speaks it; otherwise speak it here.
  useEffect(() => {
    unlockPop()
    if (!autoRef.current) speak(items[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Speak (and advance) whenever the item changes while autoplay is on.
  // The advance timer waits for any speech in flight — including a
  // count-along the baby started — before moving on.
  useEffect(() => {
    if (!autoPlay) return
    speak(item)
    const t = setTimeout(() => {
      void speechDone.current
        .catch(() => {})
        .then(() => new Promise<void>((r) => setTimeout(r, 700)))
        .then(() => {
          if (autoRef.current) setIndex((i) => (i + 1) % items.length)
        })
    }, AUTO_PLAY_MS)
    return () => clearTimeout(t)
  }, [index, autoPlay])

  // Manual tap always speaks, autoplay or not.
  const tap = () => {
    if (!autoPlay) speakPart('both')
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === ' ') {
        e.preventDefault()
        tap()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Swipe navigation.
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touchStart.current
    if (!s) return
    touchStart.current = null
    const t = e.changedTouches[0]
    const dx = s.x - t.clientX
    const dy = s.y - t.clientY
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) go(dx > 0 ? 1 : -1)
  }

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        emoji: CONFETTI_EMOJI[i % CONFETTI_EMOJI.length],
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.8 + Math.random() * 1.2,
        size: 18 + Math.random() * 20
      })),
    // Regenerate pieces per burst.
    [confetti]
  )

  return (
    <div className="game-screen learn" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="learn-wash" style={{ background: item.color }} aria-hidden />
      <button className="home-btn" onClick={onHome} aria-label="Home">
        <HomeIcon />
      </button>

      {confetti > 0 && (
        <div className="confetti" aria-hidden key={confetti}>
          {confettiPieces.map((p, i) => (
            <span
              key={i}
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                fontSize: p.size
              }}
            >
              {p.emoji}
            </span>
          ))}
        </div>
      )}

      <button className="learn-stage" onClick={tap}>
        <div className="learn-cards" key={`${mode}-${index}`}>
          {isColor ? (
            <div className={'learn-card color-card' + (speakingCard === 'main' ? ' speaking' : '')}>
              <span className="color-swatch" style={{ background: (item as { swatch: string }).swatch }} />
            </div>
          ) : isLettersMode || isNumber ? (
            <>
              <div
                className={'learn-card main-card' + (speakingCard === 'main' ? ' speaking' : '')}
                onClick={(e) => {
                  e.stopPropagation()
                  speakPart('main')
                }}
              >
                <span className="learn-main">{item.main}</span>
              </div>
              <div
                className={'learn-card emoji-card' + (speakingCard === 'word' ? ' speaking' : '')}
                onClick={(e) => {
                  e.stopPropagation()
                  if (isNumber) {
                    // Tap the card itself to count all the apples.
                    countAlong((item as { number: number }).number - 1)
                  } else {
                    speakPart('word')
                  }
                }}
              >
                {isNumber ? (
                  <span className="count-emojis">
                    {Array.from({ length: (item as { number: number }).number }, (_, i) => (
                      <span
                        key={i}
                        style={{ '--i': i } as React.CSSProperties}
                        className="apple"
                        onClick={(e) => {
                          e.stopPropagation()
                          countAlong(i)
                        }}
                      >
                        <span className={countIndex === i ? 'counting' : undefined}>{emojiItem.emoji}</span>
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="learn-emoji">{emojiItem.emoji}</span>
                )}
              </div>
            </>
          ) : (
            <div className={'learn-card big-card' + (speakingCard === 'main' ? ' speaking' : '')}>
              <div className="learn-visual">{SingleVisual && <SingleVisual />}</div>
            </div>
          )}
        </div>
        <div className="learn-word">
          {letterItem ? (
            <>
              <b style={{ color: item.color }} className={speakingCard === 'word' ? 'first-letter lit' : 'first-letter'}>
                {item.word[0]}
              </b>
              {item.word.slice(1)}
            </>
          ) : (
            item.word
          )}
        </div>
        <div className="learn-progress">
          {index + 1} / {items.length}
        </div>
      </button>

      <div className="learn-nav">
        <button className="nav-btn" onClick={() => go(-1)} aria-label="Previous">
          <PrevIcon />
        </button>
        <button
          className={'autoplay-chip' + (autoPlay ? ' on' : '')}
          onClick={() => {
            cancelSpeech()
            setCountIndex(null)
            setAutoPlay((a) => !a)
          }}
        >
          <PlayIcon />
          Auto play
        </button>
        <button className="nav-btn" onClick={() => go(1)} aria-label="Next">
          <NextIcon />
        </button>
      </div>
    </div>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h12v-9" />
    </svg>
  )
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M15.5 4.6 7 12l8.5 7.4c.9.8 2.3.1 2.3-1V5.6c0-1.1-1.4-1.8-2.3-1Z" />
    </svg>
  )
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8.5 4.6 17 12l-8.5 7.4c-.9.8-2.3.1-2.3-1V5.6c0-1.1 1.4-1.8 2.3-1Z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13c0 .9 1 1.5 1.8 1L20 13a1.2 1.2 0 0 0 0-2L9.8 4.5C9 4 8 4.6 8 5.5Z" />
    </svg>
  )
}
