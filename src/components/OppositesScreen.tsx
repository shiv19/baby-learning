import { useEffect, useRef, useState } from 'react'
import { oppositePairs } from '../data/opposites'
import type { OppositePair } from '../data/opposites'
import { cancelSpeech, speakSequence } from '../lib/speech'
import { unlockPop } from '../lib/pop'
import { PAIR_VISUALS } from './opposites/visuals'

interface Props {
  onHome: () => void
}

const AUTO_PLAY_MS = 4000

export default function OppositesScreen({ onHome }: Props) {
  const [index, setIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [speakingSide, setSpeakingSide] = useState<'a' | 'b' | null>(null)
  const autoRef = useRef(autoPlay)
  autoRef.current = autoPlay
  const speechRun = useRef(0)
  // Resolves when the latest speech sequence finishes; autoplay waits on it.
  const speechDone = useRef<Promise<void>>(Promise.resolve())

  const pair = oppositePairs[index]

  const speakSides = (p: OppositePair, sides: Array<'a' | 'b'>) => {
    const run = ++speechRun.current
    setSpeakingSide(null)
    const words = sides.map((s) => p[s].word)
    speechDone.current = speakSequence(words, (i) => setSpeakingSide(sides[i])).then(() => {
      if (speechRun.current === run) setSpeakingSide(null)
    })
  }

  const speakSide = (side: 'a' | 'b') => {
    unlockPop()
    speakSides(pair, [side])
  }

  const speakBoth = () => speakSides(pair, ['a', 'b'])

  const go = (delta: number) => {
    cancelSpeech()
    unlockPop()
    const next = (index + delta + oppositePairs.length) % oppositePairs.length
    setIndex(next)
    // Pass the target pair explicitly — `pair` here is still the slide
    // being left, and the words must match the slide appearing.
    if (!autoRef.current) speakSides(oppositePairs[next], ['a', 'b'])
  }

  // Announce the pair on entry (entry tap doubles as the speech unlock).
  useEffect(() => {
    unlockPop()
    if (!autoRef.current) speakSides(oppositePairs[0], ['a', 'b'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Autoplay: speak both words, wait for speech (and a breath), advance.
  useEffect(() => {
    if (!autoPlay) return
    speakBoth()
    const t = setTimeout(() => {
      void speechDone.current
        .catch(() => {})
        .then(() => new Promise<void>((r) => setTimeout(r, 700)))
        .then(() => {
          if (autoRef.current) setIndex((i) => (i + 1) % oppositePairs.length)
        })
    }, AUTO_PLAY_MS)
    return () => clearTimeout(t)
  }, [index, autoPlay])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === ' ') {
        e.preventDefault()
        speakBoth()
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

  return (
    <div className="game-screen learn" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="learn-wash" style={{ background: pair.accent }} aria-hidden />
      <button className="home-btn" onClick={onHome} aria-label="Home">
        <HomeIcon />
      </button>

      <button className="learn-stage" onClick={speakBoth}>
        <div className="learn-cards opp-cards" key={index}>
          {(['a', 'b'] as const).map((side) => {
            const [VisA, VisB] = PAIR_VISUALS[pair.id] ?? []
            return (
              <div
                key={side}
                className={'opp-card' + (speakingSide === side ? ' speaking' : '')}
                onClick={(e) => {
                  e.stopPropagation()
                  speakSide(side)
                }}
              >
                <div className="opp-visual">{side === 'a' ? <VisA /> : <VisB />}</div>
                <span className="opp-word">{pair[side].word}</span>
              </div>
            )
          })}
        </div>
        <div className="learn-progress">
          {index + 1} / {oppositePairs.length}
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
