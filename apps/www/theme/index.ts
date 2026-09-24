import { wheelPickerRecipe } from "@isbatak/panda-wheel-picker"
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
          keyword: { value: { base: "{colors.purple.600}", _dark: "{colors.purple.300}" } },
          string: { value: { base: "{colors.green.700}", _dark: "{colors.green.300}" } },
          class: { value: { base: "{colors.orange.600}", _dark: "{colors.orange.300}" } },
          identifier: { value: { base: "{colors.gray.800}", _dark: "{colors.gray.200}" } },
          sign: { value: { base: "{colors.gray.500}", _dark: "{colors.gray.400}" } },
          property: { value: { base: "{colors.blue.600}", _dark: "{colors.blue.300}" } },
          entity: { value: { base: "{colors.teal.600}", _dark: "{colors.teal.300}" } },
          jsxliterals: { value: { base: "{colors.gray.700}", _dark: "{colors.gray.300}" } },
          comment: { value: { base: "{colors.gray.400}", _dark: "{colors.gray.500}" } },
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
    slotRecipes: { wheelPicker: wheelPickerRecipe },
  },
} satisfies ExtendableTheme
