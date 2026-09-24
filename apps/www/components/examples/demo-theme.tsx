import { styled } from "styled-system/jsx"

export const DemoTheme = styled("div", {
  base: {
    "--wheel-picker-fg-color": "{colors.fg}",
    "--wheel-picker-muted-color": "{colors.fg.subtle}",
    "--wheel-picker-highlight-color": "{colors.bg.muted}",
    "--wheel-picker-ring-color": "{colors.border.emphasized}",
    "--wheel-picker-border-color": "{colors.border}",
    "--wheel-picker-radius": "{radii.l2}",
  },
})
