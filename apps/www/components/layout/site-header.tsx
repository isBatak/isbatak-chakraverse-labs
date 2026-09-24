import Link from "next/link";
import { styled } from "styled-system/jsx";

import { ColorModeButton } from "../color-mode-button";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { HeaderNav } from "./header-nav";
import { LayoutContainer } from "./layout-container";

const REPO_URL = "https://github.com/isBatak/isbatak-chakraverse-labs";

// Horizontal hairline that runs across the whole viewport, past the column borders
const screenLine = {
  content: '""',
  position: "absolute",
  insetInlineStart: "-100vw",
  width: "200vw",
  height: "1px",
  bg: "border",
  zIndex: "1",
} as const;

const HomeLink = styled(Link, {
  base: {
    fontWeight: "semibold",
    letterSpacing: "tight",
  },
});

const Separator = styled("div", {
  base: {
    flexShrink: "0",
    width: "1px",
    height: "5",
    bg: "border",
  },
});

export function SiteHeader() {
  return (
    <styled.header
      position="sticky"
      top="0"
      zIndex="sticky"
      bg="bg"
      px="2"
      maxW="100vw"
      overflowX="clip"
    >
      <LayoutContainer
        display="flex"
        alignItems="center"
        gap={{ base: "2", sm: "4" }}
        h="header"
        ps="4"
        pe="2"
        _before={{ ...screenLine, top: "0" }}
        _after={{ ...screenLine, bottom: "0" }}
      >
        <HomeLink href="/">isBatal/chakraverse-labs</HomeLink>
        <styled.div flex="1" />
        <HeaderNav />
        <styled.div display="flex" alignItems="center">
          <Separator
            aria-hidden
            me="2"
            display={{ base: "none", sm: "block" }}
          />
          <Button asChild variant="ghost" size="xs" px="0" aspectRatio="square">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener"
              aria-label="GitHub repository"
            >
              <Icon size="sm" name="brand-github" />
            </a>
          </Button>
          <Separator aria-hidden mx="2" />
          <ColorModeButton />
        </styled.div>
      </LayoutContainer>
    </styled.header>
  );
}
