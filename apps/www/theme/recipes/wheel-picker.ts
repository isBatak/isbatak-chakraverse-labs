import { defineSlotRecipe } from "@pandacss/dev"

// Visual styles only; the machine sets the structural styles (positions, transforms) inline
export const wheelPicker = defineSlotRecipe({
  className: "wheel-picker",
  slots: [
    "root",
    "label",
    "control",
    "viewport",
    "itemGroup",
    "item",
    "highlight",
    "highlightItemGroup",
    "highlightItem",
  ],
  base: {
    root: {
      width: "64",
    },
    label: {
      srOnly: true,
    },
    control: {
      height: "72",
      outline: "none",
      cursor: "grab",
      _active: { cursor: "grabbing" },
    },
    viewport: {
      maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
    },
    item: {
      color: "fg.subtle",
      textStyle: "xl",
      fontWeight: "medium",
      _disabled: { opacity: "0.35" },
    },
    highlight: {
      borderRadius: "l2",
      bg: "bg.muted",
      _focusVisible: { outline: "2px solid", outlineColor: "border.emphasized" },
    },
    highlightItem: {
      color: "fg",
      textStyle: "xl",
      fontWeight: "semibold",
      _disabled: { opacity: "0.35" },
    },
  },
})
