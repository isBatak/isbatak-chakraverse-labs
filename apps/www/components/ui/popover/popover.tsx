"use client"

import { Popover } from "@ark-ui/react/popover"
import type { ComponentProps } from "react"
import { createSlotRecipeContext } from "styled-system/jsx"
import { popover } from "styled-system/recipes"

const { withRootProvider, withContext } = createSlotRecipeContext(popover)

export const PopoverRoot = withRootProvider(Popover.Root)
export type PopoverRootProps = ComponentProps<typeof PopoverRoot>

export const PopoverTrigger = withContext(Popover.Trigger, "trigger")
export type PopoverTriggerProps = ComponentProps<typeof PopoverTrigger>

export const PopoverAnchor = withContext(Popover.Anchor, "anchor")
export type PopoverAnchorProps = ComponentProps<typeof PopoverAnchor>

export const PopoverPositioner = withContext(Popover.Positioner, "positioner")
export type PopoverPositionerProps = ComponentProps<typeof PopoverPositioner>

export const PopoverContent = withContext(Popover.Content, "content")
export type PopoverContentProps = ComponentProps<typeof PopoverContent>

export const PopoverArrow = withContext(Popover.Arrow, "arrow")
export type PopoverArrowProps = ComponentProps<typeof PopoverArrow>

export const PopoverArrowTip = withContext(Popover.ArrowTip, "arrowTip")
export type PopoverArrowTipProps = ComponentProps<typeof PopoverArrowTip>

export const PopoverTitle = withContext(Popover.Title, "title")
export type PopoverTitleProps = ComponentProps<typeof PopoverTitle>

export const PopoverDescription = withContext(Popover.Description, "description")
export type PopoverDescriptionProps = ComponentProps<typeof PopoverDescription>

export const PopoverCloseTrigger = withContext(Popover.CloseTrigger, "closeTrigger")
export type PopoverCloseTriggerProps = ComponentProps<typeof PopoverCloseTrigger>

export const PopoverHeader = withContext("div", "header")
export type PopoverHeaderProps = ComponentProps<typeof PopoverHeader>

export const PopoverBody = withContext("div", "body")
export type PopoverBodyProps = ComponentProps<typeof PopoverBody>

export const PopoverFooter = withContext("div", "footer")
export type PopoverFooterProps = ComponentProps<typeof PopoverFooter>
