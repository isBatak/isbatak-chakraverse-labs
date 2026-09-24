import type { ComponentProps } from "react"
import { styled } from "styled-system/jsx"
import { badge } from "styled-system/recipes"

export const Badge = styled("span", badge)

export type BadgeProps = ComponentProps<typeof Badge>
