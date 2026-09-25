import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  designSystem: "@isbatak/panda-ds",
  preflight: true,
  include: ["../storybook-*/src/**/*.{ts,tsx,vue,svelte}"],
})
