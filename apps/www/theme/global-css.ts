import { defineGlobalStyles } from "@pandacss/dev"

export const globalCss = defineGlobalStyles({
  html: {
    colorPalette: "gray",
  },
  body: {
    minHeight: "100dvh",
  },
  ":root": {
    viewTransitionName: "none",
  },
  "::view-transition": {
    pointerEvents: "none",
  },
})
