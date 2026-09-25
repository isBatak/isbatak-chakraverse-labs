import type { FileConfig } from "@ikona/cli"

export default {
  verbose: false,
  icons: {
    inputDir: "./assets/icons",
    spriteOutputDir: "./assets",
    optimize: true,
  },
  illustrations: {
    inputDir: "./assets/illustrations",
  },
} satisfies FileConfig
