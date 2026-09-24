import { defineConfig } from "@pandacss/dev"

import { theme } from "./theme"
import { globalCss } from "./theme/global-css"

export default defineConfig({
  designSystem: "@isbatak/panda-ds",
  preflight: true,
  jsxFramework: "react",
  include: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  exclude: [],
  dependencies: ["./theme/**/*.ts"],
  outdir: "styled-system",
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
