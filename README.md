# Baby Learning

A toddler learning PWA: big animated cards, friendly narration, zero ads, zero tracking. Built for small hands and short attention spans — every category is a stack of full-screen cards you tap to hear.

## Categories

| Category | What it teaches | Interaction |
| --- | --- | --- |
| **Letters** | A–Z with a word and picture per letter | Tap the letter or the picture to hear each part |
| **Numbers** | 1–20 with counted objects | Tap apples to count along, wave animation while speaking |
| **Colors** | Rainbow order + everyday colors | Giant swatch cards |
| **Opposites** | Open/shut, big/small, fast/slow… | Side-by-side animated scenes; tap either side |
| **Shapes** | Circle, square, triangle, star… | Animated shape scenes |
| **Copy me** | Action words (clap, jump, wave…) | An animated character demonstrates — toddler imitates |
| **Feelings** | Happy, sad, sleepy, surprised… | Expressive animated faces |
| **Vehicles** | Car, train, plane… with fun sounds | Animated vehicles + "vroom vroom" |

Every screen supports **swipe / arrow keys** to flip, **auto play** to run hands-free (it waits for speech to finish before advancing), and a **narration toggle** on the home screen so parents can do the talking.

## Tech

- Vite + React 19 + TypeScript, strict mode
- [motion](https://motion.dev) + hand-rolled CSS keyframes for the animation scenes
- Web Speech API for narration (on-device, offline-friendly)
- Web Audio for tiny synthesized pop sounds (no audio assets)
- PWA via `vite-plugin-pwa` (installable, offline, auto-updating service worker)

## Development

```bash
npm install
npm run dev        # dev server
npm run build      # typecheck + production build
npm run icons      # regenerate PWA icons into public/icons
npm run preview    # serve the production build
```

## Deploying

The build assumes the app is served under `/baby-learning/` (see `base` in `vite.config.ts`) — e.g. GitHub Pages from this repo.
