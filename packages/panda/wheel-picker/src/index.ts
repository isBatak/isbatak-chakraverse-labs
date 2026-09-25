import { definePreset, defineSlotRecipe } from "@pandacss/dev"
import type { Preset, SlotRecipeConfig } from "@pandacss/types"

export const wheelPickerSlots = [
  "root",
  "label",
  "control",
  "viewport",
  "itemGroup",
  "item",
  "highlight",
  "highlightItemGroup",
  "highlightItem",
] as const

export const wheelPickerRecipe: SlotRecipeConfig = defineSlotRecipe({
  className: "wheel-picker",
  jsx: ["WheelPicker", /WheelPicker\.\w+/],
  slots: [...wheelPickerSlots],
  base: {
    root: {
      width: "full",
      _disabled: { opacity: "0.5" },
    },
    label: {
      srOnly: true,
    },
    control: {
      outline: "none",
      cursor: "grab",
      _dragging: { cursor: "grabbing" },
      "&[data-readonly]": { cursor: "default" },
      _disabled: { cursor: "not-allowed" },
    },
    viewport: {
      maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
    },
    item: {
      color: "fg.subtle",
      fontWeight: "medium",
      _disabled: { opacity: "0.35" },
    },
    highlight: {
      borderRadius: "l2",
      "[data-focus-visible] &": { outline: "2px solid", outlineColor: "colorPalette.focusRing", outlineOffset: "-2px" },
      "[data-invalid] &": { outline: "2px solid", outlineColor: "border.error", outlineOffset: "-2px" },
    },
    highlightItem: {
      fontWeight: "semibold",
      _disabled: { opacity: "0.35" },
    },
  },
  variants: {
    variant: {
      subtle: {
        highlight: { bg: "bg.muted" },
        highlightItem: { color: "fg" },
      },
      outline: {
        highlight: { borderWidth: "1px", borderColor: "border" },
        highlightItem: { color: "fg" },
      },
      solid: {
        highlight: { bg: "colorPalette.solid" },
        highlightItem: { color: "colorPalette.contrast" },
      },
    },
    size: {
      sm: {
        control: { height: "40" },
        item: { textStyle: "sm" },
        highlightItem: { textStyle: "sm" },
      },
      md: {
        control: { height: "56" },
        item: { textStyle: "md" },
        highlightItem: { textStyle: "md" },
      },
      lg: {
        control: { height: "72" },
        item: { textStyle: "xl" },
        highlightItem: { textStyle: "xl" },
      },
    },
  },
  defaultVariants: {
    variant: "subtle",
    size: "md",
  },
})

export const wheelPickerPreset: Preset = definePreset({
  name: "@isbatak/panda-wheel-picker",
  theme: {
    extend: {
      slotRecipes: {
        wheelPicker: wheelPickerRecipe,
      },
    },
  },
})

export default wheelPickerPreset
