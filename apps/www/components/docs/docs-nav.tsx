"use client"

import { Portal } from "@ark-ui/react/portal"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Stack, styled } from "styled-system/jsx"

import { Button } from "../ui/button"
import { Drawer } from "../ui/drawer"
import { Icon } from "../ui/icon"

export interface DocsNavItem {
  title: string
  permalink: string
}

const NavLink = styled(Link, {
  base: {
    display: "block",
    textStyle: "sm",
    color: "fg.muted",
    py: "1.5",
    _hover: { color: "fg" },
    _currentPage: { color: "fg", fontWeight: "medium" },
  },
})

export function DocsNav({ items }: { items: DocsNavItem[] }) {
  const pathname = usePathname()

  return (
    <Drawer.Root placement="start" size="xs">
      <Drawer.Trigger asChild>
        <Button variant="ghost" size="xs" px="0" aspectRatio="square" aria-label="Open navigation">
          <Icon size="sm" name="layout-sidebar" />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title textStyle="sm" fontWeight="semibold">
                <Link href="/">isbatak zag</Link>
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Stack gap="0">
                {items.map((item) => (
                  <NavLink
                    key={item.permalink}
                    href={item.permalink}
                    aria-current={pathname === item.permalink ? "page" : undefined}
                  >
                    {item.title}
                  </NavLink>
                ))}
              </Stack>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <Button variant="ghost" size="xs" px="0" aspectRatio="square" aria-label="Close navigation">
                <Icon size="sm" name="x" />
              </Button>
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
