import { defineConfig } from "@pandacss/dev"

import { conditions, globalCss, theme, utilities } from "./src/theme"

export default defineConfig({
  presets: ["@pandacss/preset-base"],
  preflight: true,
  jsxFramework: "react",
  include: ["./src/**/*.{ts,tsx}"],
  exclude: ["./src/theme/**"],
  dependencies: ["./src/**/*.ts"],
  outdir: "styled-system",
  conditions,
  utilities: {
    extend: utilities,
  },
  globalCss,
  theme,
})
