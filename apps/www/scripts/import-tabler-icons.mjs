// Downloads Tabler icons into assets/icons, the input folder of the ikona sprite.
// The set mirrors Chakra UI's internal icons (packages/react/src/components/icons.tsx).
//
// Ikona strips `fill` from the root <svg> when turning it into a <symbol>, so the root
// presentation attributes (fill="none", stroke, ...) are moved onto a wrapping <g>.

import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

const TABLER_VERSION = "v3.48.0"

/** icon name in the sprite -> path in tabler-icons/icons */
const icons = {
  check: "outline/check", // CheckIcon
  "chevron-left": "outline/chevron-left", // ChevronLeftIcon
  "chevron-up": "outline/chevron-up", // ChevronUpIcon
  "chevron-down": "outline/chevron-down", // ChevronDownIcon
  "chevron-right": "outline/chevron-right", // ChevronRightIcon
  dots: "outline/dots", // EllipsisIcon, EllpsisIcon
  "arrow-up": "outline/arrow-up", // ArrowUpIcon
  "arrow-down": "outline/arrow-down", // ArrowDownIcon
  "circle-check": "outline/circle-check", // CheckCircleIcon
  "alert-circle": "outline/alert-circle", // WarningIcon
  "info-circle": "outline/info-circle", // InfoIcon
  quote_filled: "filled/quote", // QuoteIcon
  star_filled: "filled/star", // StarIcon
  "alert-circle_filled": "filled/alert-circle", // ErrorIcon
  x: "outline/x", // CloseIcon
  file: "outline/file", // FileIcon
  copy: "outline/copy", // CopyIcon
  "color-picker": "outline/color-picker", // PipetteIcon
  // Website
  "brand-github": "outline/brand-github",
  sun: "outline/sun",
  moon: "outline/moon",
  "layout-sidebar": "outline/layout-sidebar",
}

const PRESENTATION_ATTRS = ["fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin"]

function normalize(svg) {
  const source = svg.replace(/<!--[\s\S]*?-->/g, "").trim()
  const [, rootAttrs, children] = source.match(/^<svg([^>]*)>([\s\S]*)<\/svg>$/) ?? []
  if (rootAttrs === undefined) throw new Error("Unexpected SVG shape")

  const attr = (name) => rootAttrs.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]
  const groupAttrs = PRESENTATION_ATTRS.filter(attr)
    .map((name) => `${name}="${attr(name)}"`)
    .join(" ")

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${attr("viewBox")}">`,
    `  <g ${groupAttrs}>`,
    children
      .trim()
      .split("\n")
      .map((line) => `    ${line.trim()}`)
      .join("\n"),
    `  </g>`,
    `</svg>`,
    "",
  ].join("\n")
}

const outDir = join(import.meta.dirname, "../assets/icons")
await mkdir(outDir, { recursive: true })

await Promise.all(
  Object.entries(icons).map(async ([name, path]) => {
    const url = `https://raw.githubusercontent.com/tabler/tabler-icons/${TABLER_VERSION}/icons/${path}.svg`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`${res.status} ${url}`)
    await writeFile(join(outDir, `${name}.svg`), normalize(await res.text()))
    console.log(`${name} <- ${path}`)
  }),
)
