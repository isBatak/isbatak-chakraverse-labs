import { defineConditions } from "@pandacss/dev"

export const conditions = defineConditions({
  extend: {
    dark: ".dark &",
    light: ":root &, .light &",
    motionReduce: "@media (prefers-reduced-motion: reduce)",
    // A page opts into the wide layout by rendering an element with data-layout="wide"
    layoutWide: "body:has([data-layout=wide]) &",
  },
})
