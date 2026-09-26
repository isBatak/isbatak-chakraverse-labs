import { defineStyles } from "@pandacss/dev"

export const segmentVars = defineStyles({
  "--segment-radius": "radii.l2",
  "--segment-padding": "spacing.1",
  "--segment-indicator-bg": {
    base: "colors.bg",
    _dark: "colors.bg.emphasized",
  },
  "--segment-indicator-shadow": "shadows.xs",
})

export const segmentItem = defineStyles({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  fontWeight: "medium",
  color: "fg.muted",
  userSelect: "none",
  cursor: "pointer",
  transitionProperty: "color",
  transitionDuration: "fast",
  _hover: {
    color: "fg",
  },
  _disabled: {
    opacity: "0.5",
    cursor: "not-allowed",
  },
})

export const segmentIndicator = defineStyles({
  pos: "absolute",
  width: "var(--width)",
  height: "var(--height)",
  top: "var(--top)",
  left: "var(--left)",
  zIndex: -1,
  bg: "var(--segment-indicator-bg)",
  shadow: "var(--segment-indicator-shadow)",
  borderRadius: "var(--segment-radius)",
})

export const segmentSizes = {
  "2xs": {
    root: defineStyles({ "--segment-height": "sizes.6", "--segment-item-height": "sizes.4.5" }),
    item: defineStyles({ textStyle: "2xs", px: "2", gap: "1" }),
  },
  xs: {
    root: defineStyles({ "--segment-height": "sizes.8", "--segment-item-height": "sizes.5" }),
    item: defineStyles({ textStyle: "xs", px: "2.5", gap: "1" }),
  },
  sm: {
    root: defineStyles({ "--segment-height": "sizes.9", "--segment-item-height": "sizes.6" }),
    item: defineStyles({ textStyle: "sm", px: "3", gap: "2" }),
  },
  md: {
    root: defineStyles({ "--segment-height": "sizes.10", "--segment-item-height": "sizes.8" }),
    item: defineStyles({ textStyle: "sm", px: "4", gap: "2" }),
  },
  lg: {
    root: defineStyles({ "--segment-height": "sizes.11", "--segment-item-height": "sizes.9" }),
    item: defineStyles({ textStyle: "md", px: "4.5", gap: "3" }),
  },
}

export const segmentFitted = {
  list: defineStyles({ display: "flex" }),
  item: defineStyles({ flex: 1, textAlign: "center" }),
}

export const segmentJustify = {
  start: defineStyles({ justifyContent: "flex-start" }),
  center: defineStyles({ justifyContent: "center" }),
  end: defineStyles({ justifyContent: "flex-end" }),
}

export const segmentVariants = {
  enclosed: {
    list: defineStyles({
      "--segment-radius": "radii.l3",
      bg: "bg.muted",
      p: "var(--segment-padding)",
      gap: "0.5",
      borderRadius: "calc(var(--segment-radius) + var(--segment-padding))",
      minW: "max-content",
      textAlign: "center",
    }),
    item: defineStyles({
      height: "var(--segment-item-height)",
      minW: "var(--segment-item-height)",
      borderRadius: "var(--segment-radius)",
      "&:is([aria-selected=true], [data-selected], [data-state=checked])": {
        color: "fg",
      },
      "&:is([aria-selected=true], [data-selected], [data-state=checked])[data-ssr]": {
        bg: "var(--segment-indicator-bg)",
        shadow: "var(--segment-indicator-shadow)",
      },
    }),
  },
  line: {
    list: defineStyles({
      display: "flex",
      borderColor: "border",
      _horizontal: {
        borderBottomWidth: "1px",
      },
      _vertical: {
        borderEndWidth: "1px",
      },
    }),
    item: defineStyles({
      height: "var(--segment-height)",
      minW: "var(--segment-height)",
      _disabled: {
        _active: {
          bg: "initial",
        },
      },
      "&:is([aria-selected=true], [data-selected], [data-state=checked])": {
        color: "fg",
        _horizontal: {
          layerStyle: "indicator.bottom",
          "--indicator-offset-y": "-1px",
          "--indicator-color": "colors.colorPalette.solid",
        },
        _vertical: {
          layerStyle: "indicator.end",
          "--indicator-offset-x": "-1px",
        },
      },
    }),
    indicator: defineStyles({ display: "none" }),
  },
  subtle: {
    item: defineStyles({
      height: "var(--segment-height)",
      minW: "var(--segment-height)",
      borderRadius: "var(--segment-radius)",
      "&:is([aria-selected=true], [data-selected], [data-state=checked])": {
        bg: "colorPalette.subtle",
        color: "colorPalette.fg",
      },
    }),
    indicator: defineStyles({ display: "none" }),
  },
  outline: {
    list: defineStyles({
      "--line-thickness": "1px",
      "--line-offset": "calc(var(--line-thickness) * -1)",
      display: "flex",
      borderColor: "border",
      _horizontal: {
        _before: {
          content: '""',
          position: "absolute",
          bottom: "0px",
          width: "100%",
          borderBottomWidth: "var(--line-thickness)",
          borderBottomColor: "border",
        },
      },
      _vertical: {
        _before: {
          content: '""',
          position: "absolute",
          insetInline: "var(--line-offset)",
          height: "calc(100% - calc(var(--line-thickness) * 2))",
          borderEndWidth: "var(--line-thickness)",
          borderEndColor: "border",
        },
      },
    }),
    item: defineStyles({
      height: "var(--segment-height)",
      minW: "var(--segment-height)",
      borderWidth: "1px",
      borderColor: "transparent",
      "&:is([aria-selected=true], [data-selected], [data-state=checked])": {
        bg: "currentBg",
        color: "colorPalette.fg",
      },
      _horizontal: {
        borderTopRadius: "var(--segment-radius)",
        marginBottom: "var(--line-offset)",
        marginEnd: {
          _notLast: "var(--line-offset)",
        },
        "&:is([aria-selected=true], [data-selected], [data-state=checked])": {
          borderColor: "border",
          borderBottomColor: "transparent",
        },
      },
      _vertical: {
        borderStartRadius: "var(--segment-radius)",
        marginEnd: "var(--line-offset)",
        marginBottom: {
          _notLast: "var(--line-offset)",
        },
        "&:is([aria-selected=true], [data-selected], [data-state=checked])": {
          borderColor: "border",
          borderEndColor: "transparent",
        },
      },
    }),
    indicator: defineStyles({ display: "none" }),
  },
  plain: {
    item: defineStyles({
      height: "var(--segment-height)",
      minW: "var(--segment-height)",
      borderRadius: "var(--segment-radius)",
      "&:is([aria-selected=true], [data-selected], [data-state=checked])": {
        color: "colorPalette.fg",
      },
      "&:is([aria-selected=true], [data-selected], [data-state=checked])[data-ssr]": {
        bg: "var(--segment-indicator-bg)",
        shadow: "var(--segment-indicator-shadow)",
      },
    }),
  },
}
