import { defineSlotRecipe } from "@pandacss/dev"

export const segmentGroupSlotRecipe = defineSlotRecipe({
  className: "segment-group",
  slots: ["root", "label", "item", "itemText", "itemControl", "indicator"],
  base: {
    root: {
      "--segment-radius": "radii.l3",
      "--segment-padding": "spacing.1",
      "--segment-indicator-bg": {
        base: "colors.bg",
        _dark: "colors.bg.emphasized",
      },
      "--segment-indicator-shadow": "shadows.xs",
      borderRadius: "calc(var(--segment-radius) + var(--segment-padding))",
      display: "inline-flex",
      gap: "0.5",
      p: "var(--segment-padding)",
      minW: "max-content",
      textAlign: "center",
      position: "relative",
      isolation: "isolate",
      bg: "bg.muted",
      _vertical: {
        flexDirection: "column",
      },
    },
    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      cursor: "pointer",
      fontSize: "sm",
      position: "relative",
      color: "fg.muted",
      borderRadius: "var(--segment-radius)",
      transitionProperty: "color",
      transitionDuration: "fast",
      _hover: {
        color: "fg",
      },
      _checked: {
        color: "fg",
      },
      _disabled: {
        opacity: "0.5",
        cursor: "not-allowed",
      },
      "&:has(input:focus-visible)": {
        focusRing: "outside",
      },
      "&[data-state=checked][data-ssr]": {
        shadow: "var(--segment-indicator-shadow)",
        bg: "var(--segment-indicator-bg)",
      },
    },
    indicator: {
      shadow: "var(--segment-indicator-shadow)",
      pos: "absolute",
      bg: "var(--segment-indicator-bg)",
      width: "var(--width)",
      height: "var(--height)",
      top: "var(--top)",
      left: "var(--left)",
      zIndex: -1,
      borderRadius: "var(--segment-radius)",
    },
  },
  variants: {
    size: {
      xs: {
        item: {
          textStyle: "xs",
          px: "2.5",
          gap: "1",
          height: "5",
        },
      },
      sm: {
        item: {
          textStyle: "sm",
          px: "3",
          gap: "2",
          height: "6",
        },
      },
      md: {
        item: {
          textStyle: "sm",
          px: "4",
          gap: "2",
          height: "8",
        },
      },
      lg: {
        item: {
          textStyle: "md",
          px: "4.5",
          gap: "3",
          height: "9",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
