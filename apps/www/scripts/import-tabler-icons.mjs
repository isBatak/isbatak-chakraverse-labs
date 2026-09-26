// Downloads Tabler icons into assets/icons, the input folder of the ikona sprite.
// The set mirrors Chakra UI's internal icons (packages/react/src/components/icons.tsx).
// Brands missing from Tabler come from Simple Icons, or from the brand's own logo.
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
  home: "outline/home",
  "arrow-right": "outline/arrow-right",
  heart: "outline/heart",
  plus: "outline/plus",
  code: "outline/code",
  components: "outline/components",
  refresh: "outline/refresh",
  maximize: "outline/maximize",
  minimize: "outline/minimize",
  contrast: "outline/contrast",
  "brand-react": "outline/brand-react",
  "brand-vue": "outline/brand-vue",
  "brand-svelte": "outline/brand-svelte",
  "brand-solidjs": "outline/brand-solidjs",
  "brand-javascript": "outline/brand-javascript",
  "brand-typescript": "outline/brand-typescript",
  "brand-css3": "outline/brand-css3",
  "brand-x": "outline/brand-x",
  "brand-storybook": "outline/brand-storybook",
  "brand-openai": "outline/brand-openai",
  markdown: "outline/markdown",
  "arrow-up-right": "outline/arrow-up-right",
  focus: "outline/focus-2",
}

const SIMPLE_ICONS_VERSION = "15"

/** icon name in the sprite -> slug in simple-icons/icons */
const simpleIcons = {
  "brand-anthropic": "anthropic",
}

/** icon name in the sprite -> brand logo whose white foreground path becomes the glyph */
const brandLogos = {
  "brand-ark": {
    url: "https://raw.githubusercontent.com/chakra-ui/ark/main/website/src/app/icon.svg",
    viewBox: "56 56 400 400",
  },
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

await Promise.all(
  Object.entries(simpleIcons).map(async ([name, slug]) => {
    const url = `https://cdn.jsdelivr.net/npm/simple-icons@${SIMPLE_ICONS_VERSION}/icons/${slug}.svg`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`${res.status} ${url}`)
    const svg = (await res.text()).replace(/<title>[^<]*<\/title>/, "").replace("<svg", '<svg fill="currentColor"')
    await writeFile(join(outDir, `${name}.svg`), normalize(svg))
    console.log(`${name} <- simple-icons/${slug}`)
  }),
)

await Promise.all(
  Object.entries(brandLogos).map(async ([name, { url, viewBox }]) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`${res.status} ${url}`)
    const [, d] = (await res.text()).match(/<path\s+d="([^"]+)"\s+fill="white"/) ?? []
    if (!d) throw new Error(`No foreground path in ${url}`)
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="currentColor"><path d="${d}" /></svg>`
    await writeFile(join(outDir, `${name}.svg`), normalize(svg))
    console.log(`${name} <- ${url}`)
  }),
)
