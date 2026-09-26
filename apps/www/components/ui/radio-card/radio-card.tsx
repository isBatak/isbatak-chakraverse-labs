"use client"

import { RadioGroup } from "@ark-ui/react/radio-group"
import type { ComponentProps } from "react"
import { createSlotRecipeContext } from "styled-system/jsx"
import { radioCard } from "styled-system/recipes"

const { withProvider, withContext } = createSlotRecipeContext(radioCard)

export const RadioCardRoot = withProvider(RadioGroup.Root, "root")
export type RadioCardRootProps = ComponentProps<typeof RadioCardRoot>

export const RadioCardLabel = withContext(RadioGroup.Label, "label")
export type RadioCardLabelProps = ComponentProps<typeof RadioCardLabel>

export const RadioCardIndicator = withContext(RadioGroup.Indicator, "indicator")
export type RadioCardIndicatorProps = ComponentProps<typeof RadioCardIndicator>

export const RadioCardItem = withContext(RadioGroup.Item, "item")
export type RadioCardItemProps = ComponentProps<typeof RadioCardItem>

export const RadioCardItemText = withContext(RadioGroup.ItemText, "itemText")
export type RadioCardItemTextProps = ComponentProps<typeof RadioCardItemText>

export const RadioCardItemControl = withContext("div", "itemControl")
export type RadioCardItemControlProps = ComponentProps<typeof RadioCardItemControl>

export const RadioCardItemIndicator = withContext(RadioGroup.ItemControl, "itemIndicator", {
  defaultProps: { children: <span className="dot" /> },
})
export type RadioCardItemIndicatorProps = ComponentProps<typeof RadioCardItemIndicator>

export const RadioCardItemContent = withContext("div", "itemContent")
export type RadioCardItemContentProps = ComponentProps<typeof RadioCardItemContent>

export const RadioCardItemDescription = withContext("div", "itemDescription")
export type RadioCardItemDescriptionProps = ComponentProps<typeof RadioCardItemDescription>

export const RadioCardItemAddon = withContext("div", "itemAddon")
export type RadioCardItemAddonProps = ComponentProps<typeof RadioCardItemAddon>

export const RadioCardItemHiddenInput = RadioGroup.ItemHiddenInput
