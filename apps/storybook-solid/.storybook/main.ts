import type { StorybookConfig } from "storybook-solidjs-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  framework: {
    name: "storybook-solidjs-vite",
    options: { docgen: false },
  },
}

export default config
