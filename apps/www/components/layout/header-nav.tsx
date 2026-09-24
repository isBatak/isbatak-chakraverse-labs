"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { styled } from "styled-system/jsx"

const items = [
  {
    label: "Docs",
    href: "/docs/introduction",
    isActive: (pathname: string) => pathname.startsWith("/docs") && !pathname.startsWith("/docs/components"),
  },
  {
    label: "Components",
    href: "/docs/components/wheel-picker",
    isActive: (pathname: string) => pathname.startsWith("/docs/components"),
  },
  {
    label: "Sponsors",
    href: "/#sponsors",
    isActive: () => false,
  },
]

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
      {items.map((item) => (
        <NavLink key={item.href} href={item.href} aria-current={item.isActive(pathname) ? "page" : undefined}>
          {item.label}
        </NavLink>
      ))}
    </styled.nav>
  )
}
