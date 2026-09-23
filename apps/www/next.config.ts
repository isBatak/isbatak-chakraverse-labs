import type { NextConfig } from "next"

const pandaLoader = {
  loaders: ["./panda-turbopack-loader.cjs"],
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
