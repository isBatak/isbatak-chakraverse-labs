import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  designSystem: "@isbatak/panda-ds",
  include: ["./src/examples/**/*.{ts,tsx,vue,svelte}"],
  optimize: {
    removeUnusedTokens: true,
    removeUnusedKeyframes: true,
  },
})
