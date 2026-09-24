import type { NextConfig } from "next"

const pandaLoader = {
  loaders: ["./panda-turbopack-loader.cjs"],
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Workspace package that exports its TypeScript source
  transpilePackages: ["@isbatak/zag-wheel-picker", "@isbatak/panda-ds"],
  turbopack: {
    rules: {
      "./app/**/*.tsx": pandaLoader,
      "./components/**/*.tsx": pandaLoader,
    },
    resolveAlias: {
      // Written by scripts/panda-internal-css.mjs
      "@pandacss-internal/css": "./.panda/internal-css.mjs",
    },
  },
}

export default nextConfig
