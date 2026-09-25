import type { ComponentProps } from "react"
import { preload } from "react-dom"
import { styled } from "styled-system/jsx"
import { icon } from "styled-system/recipes"

import type { IconName } from "../../../.ikona/types/icon-name"
import sprite from "../../../assets/sprite.svg"

const BaseIcon = styled("svg", icon)

export interface IconProps extends ComponentProps<typeof BaseIcon> {
  name: IconName
}

export function Icon({ name, ...props }: IconProps) {
  return (
    <BaseIcon aria-hidden focusable="false" data-name={name} {...props}>
      <use href={`${sprite.src}#${name}`} />
    </BaseIcon>
  )
}

/** Adds `<link rel="preload">` for the sprite to the document head. */
export function preloadIconSprite() {
  preload(sprite.src, { as: "image", type: "image/svg+xml" })
}

export type { IconName }
