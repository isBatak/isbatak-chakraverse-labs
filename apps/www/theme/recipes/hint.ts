import { defineSlotRecipe } from "@pandacss/dev"

export const hint = defineSlotRecipe({
  className: "hint",
  slots: ["root", "trigger", "icon"],
  base: {
    root: {
      "--hint-pad-x": "0.3em",
      "--hint-gap": "0.25em",
      "--hint-icon": "1em",
      position: "relative",
      zIndex: "1",
      isolation: "isolate",
      display: "inline-block",
      whiteSpace: "nowrap",
      lineHeight: "1.3",
    },
    trigger: {
      color: "prose.link",
      fontWeight: "medium",
      textDecoration: "underline",
      textDecorationColor: "prose.linkDecoration",
      textDecorationThickness: "1px",
      textUnderlineOffset: "0.2em",
      cursor: "pointer",
      outline: "0",
      transitionProperty: "text-decoration-color",
      transitionDuration: "moderate",
      "&::before": {
        content: '""',
        position: "absolute",
        zIndex: "-1",
        insetBlock: "-0.05em",
        insetInlineStart: "calc(-1 * var(--hint-pad-x))",
        insetInlineEnd: "calc(-1 * var(--hint-pad-x))",
        borderRadius: "l1",
        bg: "prose.codeBg",
        opacity: "0",
        transitionProperty: "opacity, inset-inline-end",
        transitionDuration: "moderate",
        transitionTimingFunction: "ease-in-smooth",
      },
      "&:is(:hover, :focus-visible)": {
        textDecorationColor: "transparent",
      },
      "&:is(:hover, :focus-visible)::before": {
        opacity: "1",
        insetInlineEnd: "calc(-1 * (var(--hint-gap) + var(--hint-icon) + var(--hint-pad-x)))",
      },
      "&:focus-visible::before": {
        outline: "2px solid",
        outlineColor: "colorPalette.focusRing",
        outlineOffset: "1px",
      },
      _motionReduce: {
        "&::before": { transitionDuration: "0s" },
      },
    },
    icon: {
      position: "absolute",
      top: "50%",
      insetInlineStart: "calc(100% + var(--hint-gap))",
      boxSize: "var(--hint-icon)",
      color: "fg.muted",
      opacity: "0",
      translate: "-0.6em -50%",
      transitionProperty: "opacity, translate",
      transitionDuration: "moderate",
      transitionTimingFunction: "ease-in-smooth",
      "[data-slot=trigger]:is(:hover, :focus-visible) &": {
        opacity: "1",
        translate: "0 -50%",
      },
      _motionReduce: {
        transitionDuration: "0s",
      },
    },
  },
})
