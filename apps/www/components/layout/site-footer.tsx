import Link from "next/link"
import { styled } from "styled-system/jsx"

import { LayoutContainer } from "./layout-container"
import { REPO_URL, SPONSOR_URL } from "./site-links"
import { Wordmark } from "./wordmark"

const FooterLink = styled(Link, {
  base: {
    color: "fg.muted",
    transitionProperty: "color",
    transitionDuration: "fast",
    _hover: { color: "fg" },
  },
})

export function SiteFooter() {
  return (
    <styled.footer px="2">
      <LayoutContainer
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        alignItems={{ sm: "center" }}
        justifyContent="space-between"
        gap="4"
        px={{ base: "5", md: "10" }}
        py="12"
        textStyle="sm"
      >
        <styled.p color="fg.muted">
          <Wordmark />{" "}
          · MIT licensed, built in the open.
        </styled.p>
        <styled.nav aria-label="Footer" display="flex" flexWrap="wrap" gap="5">
          <FooterLink href="/docs/introduction">Docs</FooterLink>
          <FooterLink href="/docs/components/wheel-picker">Components</FooterLink>
          <FooterLink href={SPONSOR_URL} target="_blank" rel="noopener">
            Sponsor
          </FooterLink>
          <FooterLink href={REPO_URL} target="_blank" rel="noopener">
            GitHub
          </FooterLink>
        </styled.nav>
      </LayoutContainer>
    </styled.footer>
  )
}
