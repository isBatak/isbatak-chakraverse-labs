"use client"

import { Slider } from "@ark-ui/react/slider"
import type { ComponentProps } from "react"
import { createSlotRecipeContext } from "styled-system/jsx"
import { slider } from "styled-system/recipes"

const { withProvider, withContext } = createSlotRecipeContext(slider)

export const SliderRoot = withProvider(Slider.Root, "root")
export type SliderRootProps = ComponentProps<typeof SliderRoot>

export const SliderLabel = withContext(Slider.Label, "label")
export type SliderLabelProps = ComponentProps<typeof SliderLabel>

export const SliderValueText = withContext(Slider.ValueText, "valueText")
export type SliderValueTextProps = ComponentProps<typeof SliderValueText>

export const SliderControl = withContext(Slider.Control, "control")
export type SliderControlProps = ComponentProps<typeof SliderControl>

export const SliderTrack = withContext(Slider.Track, "track")
export type SliderTrackProps = ComponentProps<typeof SliderTrack>

export const SliderRange = withContext(Slider.Range, "range")
export type SliderRangeProps = ComponentProps<typeof SliderRange>

export const SliderThumb = withContext(Slider.Thumb, "thumb")
export type SliderThumbProps = ComponentProps<typeof SliderThumb>

export const SliderHiddenInput = Slider.HiddenInput
export type SliderHiddenInputProps = ComponentProps<typeof SliderHiddenInput>

export const SliderMarkerGroup = withContext(Slider.MarkerGroup, "markerGroup")
export type SliderMarkerGroupProps = ComponentProps<typeof SliderMarkerGroup>

export const SliderMarker = withContext(Slider.Marker, "marker")
export type SliderMarkerProps = ComponentProps<typeof SliderMarker>

export const SliderMarkerIndicator = withContext("div", "markerIndicator")
export type SliderMarkerIndicatorProps = ComponentProps<typeof SliderMarkerIndicator>

export const SliderMarkerLabel = withContext("span", "markerLabel")
export type SliderMarkerLabelProps = ComponentProps<typeof SliderMarkerLabel>

export const SliderDraggingIndicator = withContext(Slider.DraggingIndicator, "draggingIndicator")
export type SliderDraggingIndicatorProps = ComponentProps<typeof SliderDraggingIndicator>
