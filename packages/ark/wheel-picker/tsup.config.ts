import { esbuildPluginFilePathExtensions } from "esbuild-plugin-file-path-extensions"
import { solidPlugin } from "esbuild-plugin-solid"
import { defineConfig } from "tsup"

const solidEntry = ["src/solid/**/*.ts", "src/solid/**/*.tsx"]

export default defineConfig([
  {
    entry: ["src/types.ts", "src/react/**/*.ts", "src/react/**/*.tsx", "src/vue/**/*.ts"],
    format: ["esm", "cjs"],
    target: "es2020",
    dts: true,
    bundle: true,
    esbuildPlugins: [esbuildPluginFilePathExtensions({ esmExtension: "js", cjsExtension: "cjs" })],
  },
  {
    entry: solidEntry,
    outDir: "dist/solid",
    format: ["esm"],
    target: "es2020",
    tsconfig: "tsconfig.solid.json",
    dts: true,
    bundle: true,
    esbuildPlugins: [solidPlugin(), esbuildPluginFilePathExtensions({ esmExtension: "js" })],
  },
  {
    entry: solidEntry,
    outDir: "dist/solid",
    format: ["esm"],
    target: "esnext",
    tsconfig: "tsconfig.solid.json",
    bundle: true,
    outExtension: () => ({ js: ".jsx" }),
    esbuildOptions(options) {
      options.jsx = "preserve"
    },
    esbuildPlugins: [esbuildPluginFilePathExtensions({ esmExtension: "jsx" })],
  },
])
