import type { ExtendableTheme } from "@pandacss/types"

export const theme = {
  extend: {
    tokens: {
      fonts: {
        body: { value: "var(--font-body), ui-sans-serif, system-ui, sans-serif" },
        heading: { value: "var(--font-body), ui-sans-serif, system-ui, sans-serif" },
        mono: { value: "var(--font-mono), ui-monospace, SFMono-Regular, monospace" },
      },
    },
  },
} satisfies ExtendableTheme
