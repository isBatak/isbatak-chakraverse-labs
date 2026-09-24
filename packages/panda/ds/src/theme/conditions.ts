import { defineConditions } from "@pandacss/dev"

export const conditions = defineConditions({
  extend: {
    icon: "& :where(svg)",
    dark: ".dark &",
    light: ":root &, .light &",
    motionReduce: "@media (prefers-reduced-motion: reduce)",
  },
})
