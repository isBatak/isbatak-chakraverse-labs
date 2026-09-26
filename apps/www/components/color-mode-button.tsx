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
      <Icon
        size="sm"
        name="contrast"
        transitionProperty="rotate"
        transitionDuration="moderate"
        transitionTimingFunction="ease-in-smooth"
        _dark={{ rotate: "180deg" }}
      />
    </Button>
  );
}
