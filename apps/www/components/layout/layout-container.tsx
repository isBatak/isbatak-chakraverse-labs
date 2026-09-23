import { styled } from "styled-system/jsx"

// The page column. The header row and the page content share it so their edges line up.
// It widens to `layout.wide` when the page renders an element with data-layout="wide".
export const LayoutContainer = styled("div", {
  base: {
    position: "relative",
    width: "full",
    marginInline: "auto",
    borderInlineWidth: "1px",
    borderColor: "border",
    maxWidth: { md: "layout" },
    _layoutWide: {
      maxWidth: { md: "layout.wide" },
    },
  },
})
