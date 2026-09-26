import { defineSlotRecipe } from "@pandacss/dev"

export const tourSlotRecipe = defineSlotRecipe({
  className: "tour",
  slots: [
    "backdrop",
    "spotlight",
    "positioner",
    "content",
    "arrow",
    "arrowTip",
    "title",
    "description",
    "progressText",
    "closeTrigger",
    "actions",
    "actionTrigger",
    "control",
  ],
  base: {
    backdrop: {
      "--tour-z-index": "zIndex.popover",
      zIndex: "calc(var(--tour-z-index) + var(--tour-layer))",
      bg: "blackAlpha.500",
      "&[data-type=tooltip]": {
        display: "none",
      },
      _open: {
        animationName: "fade-in",
        animationDuration: "slow",
      },
      _closed: {
        animationName: "fade-out",
        animationDuration: "moderate",
      },
    },
    spotlight: {
      "--tour-z-index": "zIndex.popover",
      zIndex: "calc(var(--tour-z-index) + var(--tour-layer))",
      boxShadow: "0 0 0 100vmax {colors.blackAlpha.500}",
      transitionProperty: "left, top, width, height",
      transitionDuration: "moderate",
      transitionTimingFunction: "ease-in-smooth",
      _open: {
        animationName: "fade-in",
        animationDuration: "slow",
      },
      _closed: {
        animationName: "fade-out",
        animationDuration: "moderate",
      },
    },
    positioner: {
      "--tour-z-index": "zIndex.popover",
    },
    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "1",
      "--tour-bg": "colors.bg.panel",
      bg: "var(--tour-bg)",
      boxShadow: "lg",
      borderRadius: "l3",
      p: "4",
      width: "min(calc(100dvw - 1rem), {sizes.xs})",
      textStyle: "sm",
      outline: "0",
      transformOrigin: "var(--transform-origin)",
      _open: {
        animationStyle: "scale-fade-in",
        animationDuration: "fast",
      },
      _closed: {
        animationStyle: "scale-fade-out",
        animationDuration: "faster",
      },
    },
    arrow: {
      "--arrow-size": "sizes.3",
      "--arrow-background": "var(--tour-bg)",
    },
    arrowTip: {
      borderTopWidth: "1px",
      borderLeftWidth: "1px",
    },
    title: {
      fontWeight: "semibold",
      color: "fg",
      pe: "6",
    },
    description: {
      color: "fg.muted",
    },
    progressText: {
      color: "fg.subtle",
      textStyle: "xs",
    },
    closeTrigger: {
      position: "absolute",
      top: "2",
      insetEnd: "2",
    },
    control: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "2",
      mt: "3",
    },
  },
})
