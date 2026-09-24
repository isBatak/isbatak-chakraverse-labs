"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { styled } from "styled-system/jsx"

const NavLink = styled(Link, {
  base: {
    textStyle: "sm",
    fontWeight: "medium",
    letterSpacing: "wide",
    color: "fg.muted",
    transitionProperty: "color",
    transitionDuration: "fast",
    _hover: { color: "fg" },
    _currentPage: { color: "fg" },
  },
})

export function HeaderNav() {
  const pathname = usePathname()

  return (
    <styled.nav display={{ base: "none", md: "flex" }} alignItems="center" gap="5">
      <NavLink
        href="/docs/components/wheel-picker"
        aria-current={pathname.startsWith("/docs/components") ? "page" : undefined}
      >
        Components
      </NavLink>
    </styled.nav>
  )
}
