import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { LearnMode } from './data/learning'
import { cancelSpeech } from './lib/speech'
import Home from './components/Home'
import LearnScreen from './components/LearnScreen'
import OppositesScreen from './components/OppositesScreen'

export type AppMode = LearnMode | 'opposites'

export default function App() {
  const [mode, setMode] = useState<AppMode | null>(null)

  const goHome = () => {
    cancelSpeech()
    setMode(null)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mode) goHome()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode])

  let screen: ReactNode
  if (mode === 'opposites') screen = <OppositesScreen onHome={goHome} />
  else if (mode) screen = <LearnScreen key={mode} mode={mode} onHome={goHome} />
  else screen = <Home onPickMode={setMode} />

  return screen
}
