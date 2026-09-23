import { docs } from "#site/content";
import Link from "next/link";
import type { ReactNode } from "react";
import { Flex, Stack, styled } from "styled-system/jsx";

const NavLink = styled(Link, {
  base: {
    color: "fg.muted",
    textStyle: "sm",
    py: "1",
    _hover: { color: "fg" },
  },
});

export default function DocsLayout({ children }: { children: ReactNode }) {
  const nav = docs.toSorted((a, b) => a.order - b.order);

  return (
    <Flex
      data-layout="wide"
      gap="12"
      direction={{ base: "column", md: "row" }}
      px="4"
      py="10"
    >
      <styled.nav
        flexShrink="0"
        w={{ md: "48" }}
        alignSelf="flex-start"
        position={{ md: "sticky" }}
        top="calc({sizes.header} + {spacing.10})"
      >
        <Stack gap="0">
          {nav.map((doc) => (
            <NavLink key={doc.slug} href={doc.permalink}>
              {doc.title}
            </NavLink>
          ))}
        </Stack>
      </styled.nav>
      <styled.main flex="1" minW="0">
        {children}
      </styled.main>
    </Flex>
  );
}
