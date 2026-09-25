import { defineThemeVariant } from "@pandacss/dev"

import { animationStyles } from "./animation-styles"
import { breakpoints } from "./breakpoints"
import { keyframes } from "./keyframes"
import { layerStyles } from "./layer-styles"
import { recipes } from "./recipes"
import { semanticTokens } from "./semantic-tokens"
import { slotRecipes } from "./slot-recipes"
import { textStyles } from "./text-styles"
import { tokens } from "./tokens"
import { viewTransitions } from "./view-transitions"

export const theme = defineThemeVariant({
  breakpoints,
  keyframes,
  tokens,
  semanticTokens,
  recipes,
  slotRecipes,
  textStyles,
  layerStyles,
  animationStyles,
  viewTransitions,
})

export { conditions } from "./conditions"
export { globalCss } from "./global-css"
export { utilities } from "./utilities"
