"use client"

import { Menu } from "@ark-ui/react/menu"
import type { ComponentProps } from "react"
import { createSlotRecipeContext } from "styled-system/jsx"
import { menu } from "styled-system/recipes"

const { withRootProvider, withContext } = createSlotRecipeContext(menu)

export const MenuRoot = withRootProvider(Menu.Root)
export type MenuRootProps = ComponentProps<typeof MenuRoot>

export const MenuTrigger = Menu.Trigger
export type MenuTriggerProps = ComponentProps<typeof MenuTrigger>

export const MenuPositioner = withContext(Menu.Positioner, "positioner")
export type MenuPositionerProps = ComponentProps<typeof MenuPositioner>

export const MenuContent = withContext(Menu.Content, "content")
export type MenuContentProps = ComponentProps<typeof MenuContent>

export const MenuItem = withContext(Menu.Item, "item")
export type MenuItemProps = ComponentProps<typeof MenuItem>

export const MenuItemText = withContext(Menu.ItemText, "itemText")
export type MenuItemTextProps = ComponentProps<typeof MenuItemText>

export const MenuSeparator = withContext(Menu.Separator, "separator")
export type MenuSeparatorProps = ComponentProps<typeof MenuSeparator>
