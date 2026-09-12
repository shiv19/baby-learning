export interface OppositeWord {
  word: string
}

export interface OppositePair {
  /** Stable id used to pick the animated scene for this pair. */
  id: string
  /** Accent used for the background wash. */
  accent: string
  a: OppositeWord
  b: OppositeWord
}

/** One pair per slide; words the toddler can imitate with gestures. */
export const oppositePairs: OppositePair[] = [
  { id: 'open-shut', accent: '#b0764a', a: { word: 'Open' }, b: { word: 'Shut' } },
  { id: 'big-small', accent: '#5b8a5b', a: { word: 'Big' }, b: { word: 'Small' } },
  { id: 'fast-slow', accent: '#7a6aa0', a: { word: 'Fast' }, b: { word: 'Slow' } },
  { id: 'up-down', accent: '#4a8ac2', a: { word: 'Up' }, b: { word: 'Down' } },
  { id: 'left-right', accent: '#c98a3a', a: { word: 'Left' }, b: { word: 'Right' } },
  { id: 'hot-cold', accent: '#d1603d', a: { word: 'Hot' }, b: { word: 'Cold' } },
  { id: 'happy-sad', accent: '#c9a22a', a: { word: 'Happy' }, b: { word: 'Sad' } },
  { id: 'loud-quiet', accent: '#6a7ac2', a: { word: 'Loud' }, b: { word: 'Quiet' } },
  { id: 'day-night', accent: '#4a5a8a', a: { word: 'Day' }, b: { word: 'Night' } },
  { id: 'stop-go', accent: '#5aa05a', a: { word: 'Stop' }, b: { word: 'Go' } },
  { id: 'clean-dirty', accent: '#4a9ab0', a: { word: 'Clean' }, b: { word: 'Dirty' } },
  { id: 'peekaboo', accent: '#b06a9a', a: { word: 'Peek-a-boo' }, b: { word: 'I see you' } }
]
