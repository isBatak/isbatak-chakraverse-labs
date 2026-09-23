import { defineConditions } from "@pandacss/dev"

export const conditions = defineConditions({
  extend: {
    dark: ".dark &",
    light: ":root &, .light &",
    motionReduce: "@media (prefers-reduced-motion: reduce)",
  },
})
