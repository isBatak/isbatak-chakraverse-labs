import { styled } from "styled-system/jsx"

export const BottomBlur = styled(
  "div",
  {
    base: {
      pointerEvents: "none",
      userSelect: "none",
      position: "fixed",
      insetX: "0",
      bottom: "0",
      zIndex: "docked",
      h: "150px",
      bgImage: "linear-gradient(to bottom, transparent, {colors.bg})",
      backdropFilter: "blur(4px)",
      maskImage: "linear-gradient(to top, black 50%, transparent)",
      ":root:has([data-preview]) &": { right: { lg: "50%" } },
      "@supports (animation-timeline: scroll())": {
        animationName: "scroll-blur-out",
        animationTimingFunction: "linear",
        animationFillMode: "both",
        animationTimeline: "scroll(root)",
        animationRange: "calc(100% - 150px) 100%",
      },
    },
  },
  {
    defaultProps: {
      "aria-hidden": true,
    },
  },
)
