import type { ExtendableTheme } from "@pandacss/types"

import { layoutContainer } from "./recipes/layout-container"
import { wheelPicker } from "./recipes/wheel-picker"

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
    keyframes: {
      "scroll-blur-out": {
        to: { opacity: "0", backdropFilter: "blur(0)" },
      },
    },
    recipes: {
      layoutContainer,
      // Icons default to the surrounding font size; `size` variants override it
      icon: { base: { boxSize: "1em" } },
    },
    slotRecipes: { wheelPicker },
  },
} satisfies ExtendableTheme
