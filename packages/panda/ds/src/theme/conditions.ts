import { defineConditions } from "@pandacss/dev"

import { radiusCondition, radiusPresets } from "./radius"

export const conditions = defineConditions({
  extend: {
    icon: "& :where(svg)",
    dark: ".dark &",
    light: ":root &, .light &",
    motionReduce: "@media (prefers-reduced-motion: reduce)",
    ...Object.fromEntries(radiusPresets.map((preset) => [radiusCondition(preset), `[data-radius="${preset}"] &`])),
  },
})
