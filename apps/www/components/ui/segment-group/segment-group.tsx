"use client"

import { SegmentGroup } from "@ark-ui/react/segment-group"
import type { ComponentProps } from "react"
import { createSlotRecipeContext } from "styled-system/jsx"
import { segmentGroup } from "styled-system/recipes"

const { withProvider, withContext } = createSlotRecipeContext(segmentGroup)

export const SegmentGroupRoot = withProvider(SegmentGroup.Root, "root")
export type SegmentGroupRootProps = ComponentProps<typeof SegmentGroupRoot>

export const SegmentGroupIndicator = withContext(SegmentGroup.Indicator, "indicator")
export type SegmentGroupIndicatorProps = ComponentProps<typeof SegmentGroupIndicator>

export const SegmentGroupItem = withContext(SegmentGroup.Item, "item")
export type SegmentGroupItemProps = ComponentProps<typeof SegmentGroupItem>

export const SegmentGroupItemText = withContext(SegmentGroup.ItemText, "itemText")
export type SegmentGroupItemTextProps = ComponentProps<typeof SegmentGroupItemText>

export const SegmentGroupItemControl = withContext(SegmentGroup.ItemControl, "itemControl")
export type SegmentGroupItemControlProps = ComponentProps<typeof SegmentGroupItemControl>

export const SegmentGroupItemHiddenInput = SegmentGroup.ItemHiddenInput
