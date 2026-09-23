import type { StorybookConfig } from "@storybook/svelte-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.ts"],
  framework: "@storybook/svelte-vite",
}

export default config
