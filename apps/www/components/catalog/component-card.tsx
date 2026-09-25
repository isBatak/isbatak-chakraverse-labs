import Link from "next/link"
import { styled } from "styled-system/jsx"

import { ExampleThumbnail } from "../examples/example-view"
import { Badge } from "../ui/badge"
import { Icon } from "../ui/icon"

// Inline `styled()` configs: don't pass style props to these, the Panda transformer would drop the base styles.

const Card = styled(Link, {
  base: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "l3",
    borderWidth: "1px",
    bg: "bg",
    overflow: "hidden",
    outline: "none",
    transitionProperty: "border-color, box-shadow, translate",
    transitionDuration: "moderate",
    _hover: { borderColor: "border.emphasized", shadow: "md", translate: "0 -2px" },
    _focusVisible: { outline: "2px solid", outlineColor: "colorPalette.focusRing", outlineOffset: "2px" },
  },
})

const Thumbnail = styled("div", {
  base: {
    position: "relative",
    display: "grid",
    placeItems: "center",
    height: "64",
    overflow: "hidden",
    bg: "bg.subtle",
    borderBottomWidth: "1px",
  },
})

const Body = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    p: "5",
  },
})

const Category = styled("span", {
  base: {
    fontFamily: "mono",
    textStyle: "overline",
    color: "fg.subtle",
  },
})

const Title = styled("h2", {
  base: {
    mt: "2",
    textStyle: "lg",
    fontWeight: "semibold",
    letterSpacing: "tight",
  },
})

const Description = styled("p", {
  base: {
    mt: "1.5",
    textStyle: "sm",
    lineHeight: "1.6",
    color: "fg.muted",
    textWrap: "pretty",
  },
})

const Action = styled("span", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "1",
    mt: "auto",
    pt: "5",
    textStyle: "sm",
    fontWeight: "medium",
  },
})

export interface ComponentCardProps {
  href: string
  title: string
  description?: string | undefined
  category: string
  status?: "new" | "beta" | "stable" | undefined
  example?: string | undefined
}

export function ComponentCard({ href, title, description, category, status, example }: ComponentCardProps) {
  return (
    <Card href={href}>
      <Thumbnail>{example && <ExampleThumbnail id={example} />}</Thumbnail>
      <Body>
        <styled.div display="flex" alignItems="center" justifyContent="space-between" gap="3">
          <Category>{category}</Category>
          {status === "new" && <Badge colorPalette="green">New</Badge>}
          {status === "beta" && <Badge colorPalette="orange">Beta</Badge>}
        </styled.div>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        <Action>
          View component
          <Icon name="arrow-right" />
        </Action>
      </Body>
    </Card>
  )
}
