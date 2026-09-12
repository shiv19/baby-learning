export type LearnMode = 'letters' | 'numbers' | 'colors' | 'shapes' | 'actions' | 'feelings' | 'vehicles'

interface BaseItem {
  /** The big thing shown on the left card: a letter, digit or color swatch. */
  main: string
  /** The spoken + written word. */
  word: string
  color: string
}

export interface LetterItem extends BaseItem {
  letter: string
  emoji: string
}

export interface NumberItem extends BaseItem {
  number: number
  emoji: string
}

export interface ColorItem extends BaseItem {
  swatch: string
}

/** A single-subject card rendered by an animated scene from a visual registry. */
export interface VisualItem extends BaseItem {
  id: string
  /** An optional fun sound spoken after the word ("vroom vroom"). */
  say?: string
}

export type LearnItem = LetterItem | NumberItem | ColorItem | VisualItem

import { actionItems } from './actions'
import { feelingItems } from './feelings'
import { shapeItems } from './shapes'
import { vehicleItems } from './vehicles'

export const letterItems: LetterItem[] = [
  { letter: 'A', main: 'A', word: 'Apple', color: '#4a7c2e', emoji: '🍎' },
  { letter: 'B', main: 'B', word: 'Ball', color: '#2e6da4', emoji: '⚽' },
  { letter: 'C', main: 'C', word: 'Cat', color: '#c1652a', emoji: '🐱' },
  { letter: 'D', main: 'D', word: 'Dog', color: '#8a5a2b', emoji: '🐶' },
  { letter: 'E', main: 'E', word: 'Elephant', color: '#7a6aa0', emoji: '🐘' },
  { letter: 'F', main: 'F', word: 'Fish', color: '#2e8ba8', emoji: '🐟' },
  { letter: 'G', main: 'G', word: 'Grapes', color: '#5b7a3a', emoji: '🍇' },
  { letter: 'H', main: 'H', word: 'House', color: '#b5543b', emoji: '🏠' },
  { letter: 'I', main: 'I', word: 'Ice cream', color: '#c98aa6', emoji: '🍦' },
  { letter: 'J', main: 'J', word: 'Juice', color: '#d19a2f', emoji: '🧃' },
  { letter: 'K', main: 'K', word: 'Kite', color: '#3b8a8a', emoji: '🪁' },
  { letter: 'L', main: 'L', word: 'Lion', color: '#c19a2e', emoji: '🦁' },
  { letter: 'M', main: 'M', word: 'Moon', color: '#5f6a8a', emoji: '🌙' },
  { letter: 'N', main: 'N', word: 'Nest', color: '#8a6f4a', emoji: '🪺' },
  { letter: 'O', main: 'O', word: 'Orange', color: '#d17a2a', emoji: '🍊' },
  { letter: 'P', main: 'P', word: 'Panda', color: '#4a4a52', emoji: '🐼' },
  { letter: 'Q', main: 'Q', word: 'Queen', color: '#8a5a8a', emoji: '👑' },
  { letter: 'R', main: 'R', word: 'Rabbit', color: '#a08080', emoji: '🐰' },
  { letter: 'S', main: 'S', word: 'Sun', color: '#c9922a', emoji: '☀️' },
  { letter: 'T', main: 'T', word: 'Tiger', color: '#c1652a', emoji: '🐅' },
  { letter: 'U', main: 'U', word: 'Umbrella', color: '#3a6a9a', emoji: '☂️' },
  { letter: 'V', main: 'V', word: 'Violin', color: '#8a4a3a', emoji: '🎻' },
  { letter: 'W', main: 'W', word: 'Whale', color: '#2e6a8a', emoji: '🐋' },
  { letter: 'X', main: 'X', word: 'Xylophone', color: '#7a4a9a', emoji: '🎵' },
  { letter: 'Y', main: 'Y', word: 'Yo-yo', color: '#c9a22a', emoji: '🪀' },
  { letter: 'Z', main: 'Z', word: 'Zebra', color: '#5a5a5a', emoji: '🦓' }
]

const numberWords = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'
]

export const numberItems: NumberItem[] = Array.from({ length: 20 }, (_, i) => {
  const n = i + 1
  return { number: n, main: String(n), word: numberWords[n], color: '#c1652a', emoji: '🍎' }
})

export const colorItems: ColorItem[] = [
  // Rainbow order first, then the rest of the everyday colors.
  { main: '', word: 'Red', color: '#c0392b', swatch: '#c0392b' },
  { main: '', word: 'Orange', color: '#d17a2a', swatch: '#e67e22' },
  { main: '', word: 'Yellow', color: '#a08520', swatch: '#f1c40f' },
  { main: '', word: 'Green', color: '#4a7c2e', swatch: '#58a05a' },
  { main: '', word: 'Blue', color: '#2e6da4', swatch: '#3a7abf' },
  { main: '', word: 'Indigo', color: '#3f51a3', swatch: '#4b54a8' },
  { main: '', word: 'Violet', color: '#7a4a9a', swatch: '#8e5aa8' },
  { main: '', word: 'Pink', color: '#b05a80', swatch: '#e87ea8' },
  { main: '', word: 'Brown', color: '#7a4a2a', swatch: '#8a5a2b' },
  { main: '', word: 'Gray', color: '#7a7a7a', swatch: '#9a9a9a' },
  { main: '', word: 'Black', color: '#333333', swatch: '#333333' },
  { main: '', word: 'White', color: '#9a9a9a', swatch: '#ffffff' }
]

export function itemsForMode(mode: LearnMode): LearnItem[] {
  if (mode === 'letters') return letterItems
  if (mode === 'numbers') return numberItems
  if (mode === 'colors') return colorItems
  if (mode === 'shapes') return shapeItems
  if (mode === 'actions') return actionItems
  if (mode === 'feelings') return feelingItems
  return vehicleItems
}
