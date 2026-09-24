import { defineRecipe } from "@pandacss/dev"

// The page column shared by the site header row and the page content, so their edges line up.
// A config recipe (not inline `styled()` config): the Panda transformer drops inline base styles
// when the component also receives style props.
export const layoutContainer = defineRecipe({
  className: "layout-container",
  base: {
    position: "relative",
    width: "full",
    marginInline: "auto",
    maxWidth: { md: "layout" },
  },
})
