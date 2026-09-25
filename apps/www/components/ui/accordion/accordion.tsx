"use client"

import { Accordion } from "@ark-ui/react/accordion"
import type { ComponentProps } from "react"
import { createSlotRecipeContext } from "styled-system/jsx"
import { accordion } from "styled-system/recipes"

const { withProvider, withContext } = createSlotRecipeContext(accordion)

export const AccordionRoot = withProvider(Accordion.Root, "root")
export type AccordionRootProps = ComponentProps<typeof AccordionRoot>

export const AccordionItem = withContext(Accordion.Item, "item")
export type AccordionItemProps = ComponentProps<typeof AccordionItem>

export const AccordionItemTrigger = withContext(Accordion.ItemTrigger, "itemTrigger")
export type AccordionItemTriggerProps = ComponentProps<typeof AccordionItemTrigger>

export const AccordionItemContent = withContext(Accordion.ItemContent, "itemContent")
export type AccordionItemContentProps = ComponentProps<typeof AccordionItemContent>

export const AccordionItemIndicator = withContext(Accordion.ItemIndicator, "itemIndicator")
export type AccordionItemIndicatorProps = ComponentProps<typeof AccordionItemIndicator>

export const AccordionItemBody = withContext("div", "itemBody")
export type AccordionItemBodyProps = ComponentProps<typeof AccordionItemBody>
