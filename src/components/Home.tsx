import { useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { AppMode } from '../App'
import { getNarration, setNarration, subscribeNarration } from '../lib/settings'
import { cancelSpeech } from '../lib/speech'

interface Props {
  onPickMode: (mode: AppMode) => void
}

const MODES: Array<{ mode: AppMode; title: string; sub: string; accent: string; icon: ReactNode }> = [
  { mode: 'letters', title: 'Letters', sub: 'A B C', accent: '#79a85b', icon: <AbcIcon /> },
  { mode: 'numbers', title: 'Numbers', sub: '1 2 3', accent: '#e8a13c', icon: <OneTwoIcon /> },
  { mode: 'colors', title: 'Colors', sub: 'Rainbow', accent: '#6b9bd1', icon: <RainbowIcon /> },
  { mode: 'shapes', title: 'Shapes', sub: 'Circle · star', accent: '#4a8ac2', icon: <ShapesIcon /> },
  { mode: 'opposites', title: 'Opposites', sub: 'Open · shut', accent: '#d96a8a', icon: <SwapIcon /> },
  { mode: 'actions', title: 'Copy me', sub: 'Clap · jump', accent: '#5aa05a', icon: <ActionsIcon /> },
  { mode: 'feelings', title: 'Feelings', sub: 'Happy · sad', accent: '#d1603d', icon: <FeelingsIcon /> },
  { mode: 'vehicles', title: 'Vehicles', sub: 'Vroom · choo', accent: '#a277c9', icon: <VehiclesIcon /> }
]

export default function Home({ onPickMode }: Props) {
  const [narration, setNarrationState] = useState(getNarration())

  useEffect(() => subscribeNarration(() => setNarrationState(getNarration())), [])

  const toggleNarration = () => {
    const next = !narration
    setNarration(next)
    // Turning narration off silences anything already playing.
    if (!next) cancelSpeech()
  }

  return (
    <div className="splash home">
      <div className="splash-washes" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <BalloonMark />
      <h1>
        Baby
        <br />
        Learning
      </h1>
      <div className="home-menu">
        {MODES.map((m) => (
          <button
            key={m.mode}
            className="menu-card"
            style={{ '--card-accent': m.accent } as CSSProperties}
            onClick={() => onPickMode(m.mode)}
          >
            <span className="menu-icon">{m.icon}</span>
            <span className="menu-text">
              <strong>{m.title}</strong>
              <small>{m.sub}</small>
            </span>
          </button>
        ))}
      </div>
      <p className="hint">{narration ? 'Tap a card to hear it out loud' : 'Narration is off — tell it in your own words'}</p>
      <button
        className={'narration-chip' + (narration ? ' on' : '')}
        onClick={toggleNarration}
        aria-pressed={narration}
      >
        <NarrationIcon on={narration} />
        Narration {narration ? 'on' : 'off'}
      </button>
      <footer className="home-about">
        <p>
          Baby Learning is an open source project — contributions are welcome on{' '}
          <a href="https://github.com/shiv19/baby-learning" target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
      </footer>
    </div>
  )
}

function NarrationIcon({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4Z" fill="currentColor" stroke="none" />
      {on ? (
        <>
          <path d="M16.5 9.5a4 4 0 0 1 0 5" />
          <path d="M19 7.5a7 7 0 0 1 0 9" />
        </>
      ) : (
        <>
          <path d="m16.5 10 4.5 4.5" />
          <path d="M21 10l-4.5 4.5" />
        </>
      )}
    </svg>
  )
}

function BalloonMark() {
  return (
    <svg className="splash-paw" viewBox="0 0 64 64" aria-hidden>
      <g fill="currentColor">
        <path d="M32 6c-9 0-15 6.6-15 15 0 6.8 4.6 11.9 9.6 15.5 1.6 1.2 2.4 2.4 2.4 4l.3 3h5.4l.3-3c.2-1.6 1-2.8 2.4-4C42.4 32.9 47 27.8 47 21c0-8.4-6-15-15-15Z" />
        <path d="M27.5 47.5h9l.8 4.5c.4 2.4-1.4 4.5-3.9 4.5h-2.8a4 4 0 0 1-3.9-4.5l.8-4.5Z" />
      </g>
    </svg>
  )
}

function AbcIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <text x="12" y="17" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="inherit">
        ABC
      </text>
    </svg>
  )
}

function OneTwoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <text x="12" y="17" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="inherit">
        123
      </text>
    </svg>
  )
}

function RainbowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
      <path d="M3 17a9 9 0 0 1 18 0" />
      <path d="M7.5 17a4.5 4.5 0 0 1 9 0" />
    </svg>
  )
}

function SwapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </svg>
  )
}

function ShapesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="7" cy="16.5" r="3.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.2" />
      <path d="M12 3.5 16 10H8l4-6.5Z" />
    </svg>
  )
}

function ActionsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="5.5" r="2.8" />
      <path d="M11 9.2c-1.4.3-2.3 1.3-2.8 2.6L6.6 15.4c-.3.9.9 1.5 1.5.8l2-2.4V17l-2.2 4.2c-.4.8.7 1.6 1.4 1l2.7-3.2 2.7 3.2c.7.6 1.8-.2 1.4-1L13.9 17v-3.2l2 2.4c.6.7 1.8.1 1.5-.8l-1.6-3.6c-.5-1.3-1.4-2.3-2.8-2.6-.6-.1-1.4-.1-2 0Z" />
    </svg>
  )
}

function FeelingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8" />
      <circle cx="9" cy="9.8" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

function VehiclesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5 11l1.2-3.2A2 2 0 0 1 8.1 6.5h7.8a2 2 0 0 1 1.9 1.3L19 11a2 2 0 0 1 2 2v3.5a1 1 0 0 1-1 1h-1.1a2.4 2.4 0 0 1-4.8 0h-4.2a2.4 2.4 0 0 1-4.8 0H4a1 1 0 0 1-1-1V13a2 2 0 0 1 2-2Zm2.2-.5h9.6l-.9-2.4a.8.8 0 0 0-.7-.5H8.8a.8.8 0 0 0-.7.5l-.9 2.4Z" />
    </svg>
  )
}
