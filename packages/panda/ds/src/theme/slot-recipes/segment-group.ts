import { defineSlotRecipe } from "@pandacss/dev"

import {
  segmentFitted,
  segmentIndicator,
  segmentItem,
  segmentJustify,
  segmentSizes,
  segmentVariants,
  segmentVars,
} from "./shared/segment"

export const segmentGroupSlotRecipe = defineSlotRecipe({
  className: "segment-group",
  slots: ["root", "label", "item", "itemText", "itemControl", "indicator"],
  base: {
    root: {
      ...segmentVars,
      display: "inline-flex",
      position: "relative",
      isolation: "isolate",
      _vertical: {
        flexDirection: "column",
      },
    },
    item: {
      ...segmentItem,
      "&:has(input:focus-visible)": {
        focusRing: "outside",
      },
    },
    indicator: segmentIndicator,
  },
  variants: {
    fitted: {
      true: {
        root: segmentFitted.list,
        item: segmentFitted.item,
      },
    },
    justify: {
      start: {
        root: segmentJustify.start,
      },
      center: {
        root: segmentJustify.center,
      },
      end: {
        root: segmentJustify.end,
      },
    },
    size: segmentSizes,
    variant: {
      enclosed: {
        root: segmentVariants.enclosed.list,
        item: segmentVariants.enclosed.item,
      },
      line: {
        root: segmentVariants.line.list,
        item: segmentVariants.line.item,
        indicator: segmentVariants.line.indicator,
      },
      subtle: {
        item: segmentVariants.subtle.item,
        indicator: segmentVariants.subtle.indicator,
      },
      outline: {
        root: segmentVariants.outline.list,
        item: segmentVariants.outline.item,
        indicator: segmentVariants.outline.indicator,
      },
      plain: {
        item: segmentVariants.plain.item,
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "enclosed",
  },
})
