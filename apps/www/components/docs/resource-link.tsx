import type { ReactNode } from "react"
import { styled } from "styled-system/jsx"

import { Icon, type IconName } from "../ui/icon"

const Anchor = styled("a", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "2",
    textStyle: "sm",
    color: "fg.muted",
    "& > span": {
      textDecoration: "underline",
      textDecorationColor: "border",
      textUnderlineOffset: "4px",
    },
    _hover: {
      color: "fg",
      "& > span": { textDecorationColor: "fg.subtle" },
    },
    _focusVisible: { outline: "2px solid", outlineColor: "colorPalette.focusRing", outlineOffset: "4px" },
  },
})

interface ResourceLinkProps {
  href: string
  icon: IconName
  children: ReactNode
}

export function ResourceLink({ href, icon, children }: ResourceLinkProps) {
  return (
    <Anchor href={href} target="_blank" rel="noopener">
      <Icon name={icon} color="fg" />
      <span>{children}</span>
      <Icon name="arrow-up-right" color="fg.subtle" />
    </Anchor>
  )
}
