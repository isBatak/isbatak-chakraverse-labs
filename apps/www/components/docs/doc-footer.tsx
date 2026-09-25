import { type Component, components } from "#site/content"
import Link from "next/link"
import { styled } from "styled-system/jsx"

import { Eyebrow } from "../home/section"
import { REQUEST_URL, X_URL } from "../layout/site-links"
import { Button } from "../ui/button"
import { Icon } from "../ui/icon"

const PagerLabel = styled("span", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "1",
    textStyle: "xs",
    textTransform: "uppercase",
    letterSpacing: "widest",
    color: "fg.subtle",
  },
})

const PagerTitle = styled("span", {
  base: {
    display: "block",
    mt: "2",
    textStyle: "md",
    fontWeight: "medium",
    color: "fg",
  },
})

const pagerItem = {
  display: "block",
  borderRadius: "l2",
  _hover: { "& > span:last-child": { textDecoration: "underline", textUnderlineOffset: "4px" } },
  _focusVisible: { outline: "2px solid", outlineColor: "colorPalette.focusRing", outlineOffset: "4px" },
} as const

const PagerLink = styled(Link, { base: pagerItem })

const PagerAnchor = styled("a", { base: pagerItem })

const getNeighbors = (component: Component) => {
  const ordered = components.toSorted((a, b) => a.order - b.order)
  const index = ordered.findIndex(({ slug }) => slug === component.slug)
  return { previous: ordered[index - 1], next: ordered[index + 1] }
}

export function DocFooter({ component }: { component: Component }) {
  const { previous, next } = getNeighbors(component)

  return (
    <styled.footer mt="20">
      <styled.section
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        alignItems={{ sm: "center" }}
        justifyContent="space-between"
        gap="6"
        py="10"
        borderTopWidth="1px"
      >
        <div>
          <Eyebrow>Need something custom?</Eyebrow>
          <styled.p mt="3" maxW="md" textStyle="lg" color="fg.muted" textWrap="pretty">
            I design and build UI components and websites made to fit your product and brand.
          </styled.p>
        </div>
        <Button asChild flexShrink="0">
          <a href={X_URL} target="_blank" rel="noopener">
            <Icon name="brand-x" />
            Message me on X
          </a>
        </Button>
      </styled.section>

      <styled.nav
        aria-label="Components"
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gap="6"
        pt="10"
        borderTopWidth="1px"
      >
        <div>
          {previous && (
            <PagerLink href={previous.permalink}>
              <PagerLabel>
                <Icon name="chevron-left" />
                Previous
              </PagerLabel>
              <PagerTitle>{previous.title}</PagerTitle>
            </PagerLink>
          )}
        </div>
        <styled.div textAlign="end">
          {next ? (
            <PagerLink href={next.permalink}>
              <PagerLabel>
                Next
                <Icon name="chevron-right" />
              </PagerLabel>
              <PagerTitle>{next.title}</PagerTitle>
            </PagerLink>
          ) : (
            <PagerAnchor href={REQUEST_URL} target="_blank" rel="noopener">
              <PagerLabel>
                Request
                <Icon name="chevron-right" />
              </PagerLabel>
              <PagerTitle>Missing a widget?</PagerTitle>
            </PagerAnchor>
          )}
        </styled.div>
      </styled.nav>
    </styled.footer>
  )
}
