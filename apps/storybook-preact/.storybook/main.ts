import type { StorybookConfig } from "@storybook/preact-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  framework: "@storybook/preact-vite",
}

export default config
