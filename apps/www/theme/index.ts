import type { ExtendableTheme } from "@pandacss/types"

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
        // Max width of the page column shared by the header and the page content
        layout: {
          DEFAULT: { value: "{sizes.3xl}" },
          wide: { value: "{sizes.6xl}" },
        },
      },
    },
  },
} satisfies ExtendableTheme
