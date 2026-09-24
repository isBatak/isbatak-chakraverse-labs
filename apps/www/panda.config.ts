import { defineConfig } from "@pandacss/dev"

import { theme } from "./theme"
import { chakra } from "./theme/chakra-preset"
import { conditions } from "./theme/conditions"
import { globalCss } from "./theme/global-css"

export default defineConfig({
  presets: ["@pandacss/preset-base", chakra],
  preflight: true,
  jsxFramework: "react",
  include: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  exclude: [],
  dependencies: ["./theme/**/*.ts"],
  outdir: "styled-system",
  conditions,
  globalCss: {
    extend: globalCss,
  },
  theme,
  optimize: {
    removeUnusedTokens: true,
    removeUnusedKeyframes: true,
    smartCompoundVariants: true,
    treeshakeDesignSystem: true,
  },
})
