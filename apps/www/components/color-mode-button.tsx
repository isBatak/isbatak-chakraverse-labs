"use client"

import { useTheme } from "next-themes"

import { Button } from "./ui/button"

export function ColorModeButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const next = resolvedTheme === "dark" ? "light" : "dark"
  return (
    <Button variant="ghost" size="sm" onClick={() => setTheme(next)} suppressHydrationWarning>
      Toggle theme
    </Button>
  )
}
