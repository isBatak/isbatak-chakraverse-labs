import { defineSlotRecipe, defineStyles } from "@pandacss/dev"

import {
  segmentFitted,
  segmentIndicator,
  segmentItem,
  segmentJustify,
  segmentSizes,
  segmentVariants,
  segmentVars,
} from "./shared/segment"

export const tabsSlotRecipe = defineSlotRecipe({
  slots: ["root", "trigger", "list", "content", "contentGroup", "indicator"],
  className: "tabs",
  base: {
    root: {
      ...segmentVars,
      position: "relative",
      _horizontal: {
        display: "block",
      },
      _vertical: {
        display: "flex",
      },
    },
    list: {
      display: "inline-flex",
      position: "relative",
      isolation: "isolate",
      _horizontal: {
        flexDirection: "row",
      },
      _vertical: {
        flexDirection: "column",
      },
    },
    trigger: {
      ...segmentItem,
      outline: "0",
      cursor: "button",
      _focusVisible: {
        zIndex: 1,
        outline: "2px solid",
        outlineColor: "colorPalette.focusRing",
      },
    },
    content: {
      focusVisibleRing: "inside",
      _horizontal: {
        width: "100%",
        pt: "var(--tabs-content-padding)",
      },
      _vertical: {
        height: "100%",
        ps: "var(--tabs-content-padding)",
      },
    },
    indicator: segmentIndicator,
  },
  variants: {
    fitted: {
      true: {
        list: segmentFitted.list,
        trigger: segmentFitted.item,
      },
    },
    justify: {
      start: {
        list: segmentJustify.start,
      },
      center: {
        list: segmentJustify.center,
      },
      end: {
        list: segmentJustify.end,
      },
    },
    size: {
      "2xs": {
        root: defineStyles({
          ...segmentSizes["2xs"].root,
          "--tabs-content-padding": "spacing.2",
        }),
        trigger: segmentSizes["2xs"].item,
      },
      xs: {
        root: defineStyles({
          ...segmentSizes.xs.root,
          "--tabs-content-padding": "spacing.2.5",
        }),
        trigger: segmentSizes.xs.item,
      },
      sm: {
        root: defineStyles({
          ...segmentSizes.sm.root,
          "--tabs-content-padding": "spacing.3",
        }),
        trigger: segmentSizes.sm.item,
      },
      md: {
        root: defineStyles({
          ...segmentSizes.md.root,
          "--tabs-content-padding": "spacing.4",
        }),
        trigger: segmentSizes.md.item,
      },
      lg: {
        root: defineStyles({
          ...segmentSizes.lg.root,
          "--tabs-content-padding": "spacing.4.5",
        }),
        trigger: segmentSizes.lg.item,
      },
    },
    variant: {
      enclosed: {
        list: segmentVariants.enclosed.list,
        trigger: segmentVariants.enclosed.item,
      },
      line: {
        list: segmentVariants.line.list,
        trigger: segmentVariants.line.item,
        indicator: segmentVariants.line.indicator,
      },
      subtle: {
        trigger: segmentVariants.subtle.item,
        indicator: segmentVariants.subtle.indicator,
      },
      outline: {
        list: segmentVariants.outline.list,
        trigger: segmentVariants.outline.item,
        indicator: segmentVariants.outline.indicator,
      },
      plain: {
        trigger: segmentVariants.plain.item,
      },
      folder: {
        root: {
          "--tabs-panel-bg": "colors.bg.subtle",
        },
        list: {
          zIndex: 1,
          gap: "1",
          _horizontal: {
            mb: "-1px",
          },
          _vertical: {
            me: "-1px",
          },
        },
        trigger: {
          height: "var(--segment-height)",
          minW: "var(--segment-height)",
          borderWidth: "1px",
          borderColor: "transparent",
          _horizontal: {
            borderBottomWidth: "0",
            borderTopRadius: "var(--segment-radius)",
          },
          _vertical: {
            borderEndWidth: "0",
            borderStartRadius: "var(--segment-radius)",
          },
          "&:is([aria-selected=true], [data-selected], [data-state=checked])": {
            color: "fg",
            bg: "var(--tabs-panel-bg)",
            borderColor: "border",
          },
        },
        content: {
          bg: "var(--tabs-panel-bg)",
          borderWidth: "1px",
          borderRadius: "l3",
          _horizontal: {
            p: "var(--tabs-content-padding)",
            borderStartStartRadius: "0",
          },
          _vertical: {
            p: "var(--tabs-content-padding)",
            borderStartStartRadius: "0",
          },
        },
        indicator: {
          display: "none",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "line",
  },
})
