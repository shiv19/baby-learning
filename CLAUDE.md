# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Project Overview

A toddler learning PWA (React 19 + TypeScript + Vite). Eight categories of full-screen learning cards with Web Speech narration, motion-driven animated scenes, and a parent narration toggle. The audience is ~2-year-olds: text is minimal, visuals carry the meaning, and every interaction is a big tap target.

## Architecture

- `src/App.tsx` — mode state (`AppMode = LearnMode | 'opposites'`); renders Home, LearnScreen, or OppositesScreen.
- `src/components/Home.tsx` — 2-column grid of category cards + narration toggle (persisted via `src/lib/settings.ts`).
- `src/components/LearnScreen.tsx` — generic learning screen for letters / numbers / colors / shapes / actions / feelings / vehicles. Handles: speak-on-entry, tap-to-speak with per-card highlight, swipe + keyboard nav, autoplay (waits for speech, incl. count-alongs, before advancing), apple count-along in numbers, confetti at 20, pop sounds.
- `src/components/OppositesScreen.tsx` — pair-based screen (two animated scenes side by side).
- `src/data/learning.ts` — `LearnMode`, item types, and `itemsForMode()`. Scene categories (shapes/actions/feelings/vehicles) are `VisualItem[]` in sibling data files.
- `src/components/<category>/visuals.tsx` — per-category `Record<id, Component>` of animated scenes (motion + CSS keyframes); CSS lives in `src/styles/<category>.css` with class prefixes (`shp-`, `act-`, `fee-`, `veh-`). Opposites: `src/components/opposites/visuals.tsx`.
- `src/lib/speech.ts` — Web Speech wrapper. `speakSequence(phrases, onPhraseStart)` cancels in-flight speech, picks the best voice, and resolves per-phrase so screens can highlight what's spoken. A run-token guards against stale sequences. Narration-off short-circuits everything.
- `src/lib/pop.ts` — Web Audio synthesized pops (unlocked on first user gesture).
- `src/lib/settings.ts` — persisted parent settings (narration on/off).

## Critical conventions (violations caused real bugs)

- **motion keyframes**: if you pass `times`, every animated property needs a keyframe array of exactly `times.length`. Prefer no `times`; use 2-keyframe one-way travel + `repeatDelay`.
- Directional concepts animate ONE way (rise, fall, cross, launch) then reset; only ambient states loop freely.
- Never fade the subject out mid-cycle (toddlers read it as disappearance).
- Speech changes must go through `speakSequence`/`speakPairs` — screens keep a `speechDone` ref so autoplay waits for count-alongs and taps.
- Visuals are mounted inside `.learn-visual` (overflow hidden, ~260px box). CSS classes for a category live only in that category's stylesheet.

## Commands

```bash
npm run dev      # dev server (add -- --host for LAN testing)
npm run build    # tsc --noEmit + vite build (PWA service worker generated)
npm run icons    # regenerate PWA PNGs into public/icons
```

Strict TS with `noUnusedLocals`/`noUnusedParameters` — keep both clean.
