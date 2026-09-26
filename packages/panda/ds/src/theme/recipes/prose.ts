import { defineRecipe } from "@pandacss/dev"

export const proseRecipe = defineRecipe({
  className: "prose",
  base: {
    '& :where(code):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
      borderRadius: "l1",
    },
  },
})
