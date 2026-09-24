"use client"

import { Tabs } from "@ark-ui/react/tabs"
import type { ComponentProps } from "react"
import { createSlotRecipeContext } from "styled-system/jsx"
import { tabs } from "styled-system/recipes"

const { withProvider, withContext } = createSlotRecipeContext(tabs)

export const TabsRoot = withProvider(Tabs.Root, "root")
export type TabsRootProps = ComponentProps<typeof TabsRoot>

export const TabsList = withContext(Tabs.List, "list")
export type TabsListProps = ComponentProps<typeof TabsList>

export const TabsTrigger = withContext(Tabs.Trigger, "trigger")
export type TabsTriggerProps = ComponentProps<typeof TabsTrigger>

export const TabsContent = withContext(Tabs.Content, "content")
export type TabsContentProps = ComponentProps<typeof TabsContent>

export const TabsIndicator = withContext(Tabs.Indicator, "indicator")
export type TabsIndicatorProps = ComponentProps<typeof TabsIndicator>
