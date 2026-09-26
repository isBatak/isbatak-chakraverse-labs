"use client"

import type { ComponentProps } from "react"
import { createSlotRecipeContext } from "styled-system/jsx"
import { hint } from "styled-system/recipes"

import { Icon } from "../icon"

const { withProvider, withContext } = createSlotRecipeContext(hint)

export const HintRoot = withProvider("span", "root")
export type HintRootProps = ComponentProps<typeof HintRoot>

export const HintTrigger = withContext("button", "trigger", { defaultProps: { type: "button" } })
export type HintTriggerProps = ComponentProps<typeof HintTrigger>

export const HintIcon = withContext(Icon, "icon")
export type HintIconProps = ComponentProps<typeof HintIcon>
