"use client"

import { Dialog } from "@ark-ui/react/dialog"
import type { ComponentProps } from "react"
import { createSlotRecipeContext } from "styled-system/jsx"
import { drawer } from "styled-system/recipes"

const { withRootProvider, withContext } = createSlotRecipeContext(drawer)

export const DrawerRoot = withRootProvider(Dialog.Root)
export type DrawerRootProps = ComponentProps<typeof DrawerRoot>

export const DrawerTrigger = withContext(Dialog.Trigger, "trigger")
export type DrawerTriggerProps = ComponentProps<typeof DrawerTrigger>

export const DrawerBackdrop = withContext(Dialog.Backdrop, "backdrop")
export type DrawerBackdropProps = ComponentProps<typeof DrawerBackdrop>

export const DrawerPositioner = withContext(Dialog.Positioner, "positioner")
export type DrawerPositionerProps = ComponentProps<typeof DrawerPositioner>

export const DrawerContent = withContext(Dialog.Content, "content")
export type DrawerContentProps = ComponentProps<typeof DrawerContent>

export const DrawerTitle = withContext(Dialog.Title, "title")
export type DrawerTitleProps = ComponentProps<typeof DrawerTitle>

export const DrawerDescription = withContext(Dialog.Description, "description")
export type DrawerDescriptionProps = ComponentProps<typeof DrawerDescription>

export const DrawerCloseTrigger = withContext(Dialog.CloseTrigger, "closeTrigger")
export type DrawerCloseTriggerProps = ComponentProps<typeof DrawerCloseTrigger>

export const DrawerHeader = withContext("div", "header")
export type DrawerHeaderProps = ComponentProps<typeof DrawerHeader>

export const DrawerBody = withContext("div", "body")
export type DrawerBodyProps = ComponentProps<typeof DrawerBody>

export const DrawerFooter = withContext("div", "footer")
export type DrawerFooterProps = ComponentProps<typeof DrawerFooter>
