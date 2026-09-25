import type { ExtendableTheme } from "@pandacss/types"

import { layoutContainer } from "./recipes/layout-container"

export const theme = {
  extend: {
    tokens: {
      fonts: {
        body: { value: "var(--font-body), ui-sans-serif, system-ui, sans-serif" },
        heading: { value: "var(--font-body), ui-sans-serif, system-ui, sans-serif" },
        mono: { value: "var(--font-mono), ui-monospace, SFMono-Regular, monospace" },
      },
      sizes: {
        header: { value: "3.5rem" },
        layout: { value: "{sizes.6xl}" },
      },
    },
    semanticTokens: {
      colors: {
        code: {
          keyword: { value: { base: "#0000FF", _dark: "#569CD6" } },
          string: { value: { base: "#A31515", _dark: "#CE9178" } },
          class: { value: { base: "#267F99", _dark: "#4EC9B0" } },
          identifier: { value: { base: "#001080", _dark: "#9CDCFE" } },
          sign: { value: { base: "#000000", _dark: "#D4D4D4" } },
          property: { value: { base: "#001080", _dark: "#9CDCFE" } },
          entity: { value: { base: "#800000", _dark: "#569CD6" } },
          jsxliterals: { value: { base: "#000000", _dark: "#D4D4D4" } },
          comment: { value: { base: "#008000", _dark: "#6A9955" } },
        },
      },
    },
    keyframes: {
      "scroll-blur-out": {
        to: { opacity: "0", backdropFilter: "blur(0)" },
      },
      "framework-roll": {
        "0%, 13.33%": { translate: "0 0" },
        "16.67%, 30%": { translate: "0 -1.25em" },
        "33.33%, 46.67%": { translate: "0 -2.5em" },
        "50%, 63.33%": { translate: "0 -3.75em" },
        "66.67%, 80%": { translate: "0 -5em" },
        "83.33%, 96.67%": { translate: "0 -6.25em" },
        "100%": { translate: "0 -7.5em" },
      },
    },
    recipes: {
      layoutContainer,
      // Icons default to the surrounding font size; `size` variants override it
      icon: { base: { boxSize: "1em" } },
    },
  },
} satisfies ExtendableTheme
