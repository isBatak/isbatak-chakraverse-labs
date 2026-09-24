import { defineSemanticTokens } from "@pandacss/dev"

import { defaultRadiusPreset, radiusCondition, radiusPresets, radiusScale } from "../radius"

const level = (key: "l1" | "l2" | "l3") => ({
  value: {
    base: `{radii.${radiusScale[defaultRadiusPreset][key]}}`,
    ...Object.fromEntries(
      radiusPresets.map((preset) => [`_${radiusCondition(preset)}`, `{radii.${radiusScale[preset][key]}}`]),
    ),
  },
})

export const radii = defineSemanticTokens.radii({
  l1: level("l1"),
  l2: level("l2"),
  l3: level("l3"),
})
