"use client"

import { WheelPicker } from "@isbatak/ark-wheel-picker/react"
import type { ComponentProps, JSX } from "react"
import { createSlotRecipeContext } from "styled-system/jsx"
import { wheelPicker } from "styled-system/recipes"

const { withProvider, withContext } = createSlotRecipeContext(wheelPicker)

const StyledWheelPickerRoot = withProvider(WheelPicker.Root, "root")

export type WheelPickerRootProps<T extends WheelPicker.CollectionItem = WheelPicker.CollectionItem> = Omit<
  ComponentProps<typeof StyledWheelPickerRoot>,
  keyof WheelPicker.RootProps<T>
> &
  WheelPicker.RootProps<T>

export const WheelPickerRoot = StyledWheelPickerRoot as <T extends WheelPicker.CollectionItem>(
  props: WheelPickerRootProps<T>,
) => JSX.Element

export const WheelPickerLabel = withContext(WheelPicker.Label, "label")
export type WheelPickerLabelProps = ComponentProps<typeof WheelPickerLabel>

export const WheelPickerControl = withContext(WheelPicker.Control, "control")
export type WheelPickerControlProps = ComponentProps<typeof WheelPickerControl>

export const WheelPickerViewport = withContext(WheelPicker.Viewport, "viewport")
export type WheelPickerViewportProps = ComponentProps<typeof WheelPickerViewport>

export const WheelPickerItemGroup = withContext(WheelPicker.ItemGroup, "itemGroup")
export type WheelPickerItemGroupProps = ComponentProps<typeof WheelPickerItemGroup>

export const WheelPickerItem = withContext(WheelPicker.Item, "item")
export type WheelPickerItemProps = ComponentProps<typeof WheelPickerItem>

export const WheelPickerHighlight = withContext(WheelPicker.Highlight, "highlight")
export type WheelPickerHighlightProps = ComponentProps<typeof WheelPickerHighlight>

export const WheelPickerHighlightItemGroup = withContext(WheelPicker.HighlightItemGroup, "highlightItemGroup")
export type WheelPickerHighlightItemGroupProps = ComponentProps<typeof WheelPickerHighlightItemGroup>

export const WheelPickerHighlightItem = withContext(WheelPicker.HighlightItem, "highlightItem")
export type WheelPickerHighlightItemProps = ComponentProps<typeof WheelPickerHighlightItem>

export const WheelPickerHiddenSelect = WheelPicker.HiddenSelect
export const WheelPickerContext = WheelPicker.Context
