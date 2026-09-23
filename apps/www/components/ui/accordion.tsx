"use client"

import { Accordion as ArkAccordion } from "@ark-ui/react/accordion"
import { createSlotRecipeContext } from "styled-system/jsx"
import { accordion } from "styled-system/recipes"

const { withProvider, withContext } = createSlotRecipeContext(accordion)

export const Root = withProvider(ArkAccordion.Root, "root")
export const Item = withContext(ArkAccordion.Item, "item")
export const ItemTrigger = withContext(ArkAccordion.ItemTrigger, "itemTrigger")
export const ItemContent = withContext(ArkAccordion.ItemContent, "itemContent")
export const ItemIndicator = withContext(ArkAccordion.ItemIndicator, "itemIndicator")
export const ItemBody = withContext("div", "itemBody")
