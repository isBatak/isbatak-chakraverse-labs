import { defineViewTransitions } from "@pandacss/dev"

export const viewTransitions = defineViewTransitions({
  fade: {
    group: {
      animationDuration: "moderate",
      animationTimingFunction: "ease-in-out",
    },
    old: {
      animationName: "fade-out",
    },
    new: {
      animationName: "fade-in",
    },
  },
  "slide-fade": {
    group: {
      animationDuration: "slow",
      animationTimingFunction: "ease-in-smooth",
    },
    old: {
      animationName: "slide-to-left, fade-out",
    },
    new: {
      animationName: "slide-from-right, fade-in",
    },
  },
  "scale-fade": {
    group: {
      animationDuration: "moderate",
      animationTimingFunction: "ease-out",
    },
    old: {
      animationName: "scale-out, fade-out",
    },
    new: {
      animationName: "scale-in, fade-in",
    },
  },
  morph: {
    group: {
      animationDuration: "slow",
      animationTimingFunction: "ease-in-smooth",
    },
  },
})
