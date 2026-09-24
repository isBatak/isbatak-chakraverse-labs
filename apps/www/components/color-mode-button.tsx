"use client";

import { useTheme } from "next-themes";

import { Button } from "./ui/button";
import { Icon } from "./ui/icon";

export function ColorModeButton() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="xs"
      px="0"
      aspectRatio="square"
      aria-label="Toggle color mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Icon size="sm" name="moon" display="none" _dark={{ display: "block" }} />
      <Icon size="sm" name="sun" _dark={{ display: "none" }} />
    </Button>
  );
}
