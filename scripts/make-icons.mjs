// Renders the app icons (a balloon on a warm cream square) to PNGs for the
// PWA manifest: standard icons plus maskable variants with a safe-zone pad.
import { Resvg } from '@resvg/resvg-js'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const balloon = (scale) => `
  <g fill="#e8875f" transform="translate(256 256) scale(${scale}) translate(-32 -32)">
    <path d="M32 6c-9 0-15 6.6-15 15 0 6.8 4.6 11.9 9.6 15.5 1.6 1.2 2.4 2.4 2.4 4l.3 3h5.4l.3-3c.2-1.6 1-2.8 2.4-4C42.4 32.9 47 27.8 47 21c0-8.4-6-15-15-15Z"/>
    <path d="M27.5 47.5h9l.8 4.5c.4 2.4-1.4 4.5-3.9 4.5h-2.8a4 4 0 0 1-3.9-4.5l.8-4.5Z"/>
  </g>`

const icons = [
  // Standard: balloon fills most of the tile.
  { file: 'icon-192.png', size: 192, scale: 6.4 },
  { file: 'icon-512.png', size: 512, scale: 6.4 },
  // Maskable: keep the artwork inside the middle 80% safe zone.
  { file: 'icon-maskable-192.png', size: 192, scale: 4.4 },
  { file: 'icon-maskable-512.png', size: 512, scale: 4.4 }
]

for (const { file, size, scale } of icons) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <rect width="512" height="512" rx="112" fill="#fdf3e3"/>
    ${balloon(scale)}
  </svg>`
  const out = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng()
  const path = join(root, 'public', 'icons', file)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, out)
  console.log('wrote', path)
}
