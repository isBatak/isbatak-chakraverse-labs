import { defineConfig } from "@pandacss/dev"
import { typographyPreset } from "@pandacss/preset-typography"

import { conditions, globalCss, theme, utilities } from "./src/theme"

export default defineConfig({
  presets: [
    "@pandacss/preset-base",
    typographyPreset({
      notProse: true,
      semanticTokens: { enabled: false },
    }),
  ],
  preflight: true,
  jsxFramework: "react",
  include: ["./src/**/*.{ts,tsx}"],
  exclude: ["./src/theme/**"],
  dependencies: ["./src/**/*.ts"],
  outdir: "styled-system",
  forceImportExtension: true,
  conditions,
  utilities: {
    extend: utilities,
  },
  globalCss,
  theme,
})
