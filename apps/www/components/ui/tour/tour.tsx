"use client"

import { Tour } from "@ark-ui/react/tour"
import type { ComponentProps } from "react"
import { createSlotRecipeContext } from "styled-system/jsx"
import { tour } from "styled-system/recipes"

const { withRootProvider, withContext } = createSlotRecipeContext(tour)

export const TourRoot = withRootProvider(Tour.Root)
export type TourRootProps = ComponentProps<typeof TourRoot>

export const TourBackdrop = withContext(Tour.Backdrop, "backdrop")
export type TourBackdropProps = ComponentProps<typeof TourBackdrop>

export const TourSpotlight = withContext(Tour.Spotlight, "spotlight")
export type TourSpotlightProps = ComponentProps<typeof TourSpotlight>

export const TourPositioner = withContext(Tour.Positioner, "positioner")
export type TourPositionerProps = ComponentProps<typeof TourPositioner>

export const TourContent = withContext(Tour.Content, "content")
export type TourContentProps = ComponentProps<typeof TourContent>

export const TourArrow = withContext(Tour.Arrow, "arrow")
export type TourArrowProps = ComponentProps<typeof TourArrow>

export const TourArrowTip = withContext(Tour.ArrowTip, "arrowTip")
export type TourArrowTipProps = ComponentProps<typeof TourArrowTip>

export const TourTitle = withContext(Tour.Title, "title")
export type TourTitleProps = ComponentProps<typeof TourTitle>

export const TourDescription = withContext(Tour.Description, "description")
export type TourDescriptionProps = ComponentProps<typeof TourDescription>

export const TourProgressText = withContext(Tour.ProgressText, "progressText")
export type TourProgressTextProps = ComponentProps<typeof TourProgressText>

export const TourCloseTrigger = withContext(Tour.CloseTrigger, "closeTrigger")
export type TourCloseTriggerProps = ComponentProps<typeof TourCloseTrigger>

export const TourControl = withContext(Tour.Control, "control")
export type TourControlProps = ComponentProps<typeof TourControl>

export const TourActionTrigger = withContext(Tour.ActionTrigger, "actionTrigger")
export type TourActionTriggerProps = ComponentProps<typeof TourActionTrigger>
