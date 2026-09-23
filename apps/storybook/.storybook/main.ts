import { existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import type { StorybookConfig } from "@storybook/html-vite"

/**
 * One Storybook per framework, composed here with Storybook refs.
 * - `storybook dev`: refs point at each framework's dev server (see its `storybook` script for the port).
 * - `storybook build`: each framework's `storybook-static` is copied to `/<id>` and referenced relatively,
 *   so build the framework Storybooks first (the root `build:storybook` script does this).
 */
const frameworks = [
  { id: "react", title: "React", port: 6007 },
  { id: "vue", title: "Vue", port: 6008 },
  { id: "svelte", title: "Svelte", port: 6009 },
  { id: "solid", title: "Solid", port: 6010 },
  { id: "preact", title: "Preact", port: 6011 },
  { id: "vanilla", title: "Vanilla", port: 6012 },
]

const staticDir = (id: string) => fileURLToPath(new URL(`../../storybook-${id}/storybook-static`, import.meta.url))

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx"],
  addons: ["@storybook/addon-docs"],
  framework: "@storybook/html-vite",
  staticDirs: (_dirs, { configType }) =>
    configType === "PRODUCTION"
      ? frameworks
          .filter(({ id }) => existsSync(staticDir(id)))
          .map(({ id }) => ({ from: staticDir(id), to: `/${id}` }))
      : [],
  refs: (_config, { configType }) =>
    Object.fromEntries(
      frameworks.map(({ id, title, port }) => [
        id,
        { title, url: configType === "DEVELOPMENT" ? `http://localhost:${port}` : `./${id}` },
      ]),
    ),
}

export default config
