import { resolve } from "node:path"
import type { NextConfig } from "next"
import { codeInspectorPlugin } from "code-inspector-plugin"

const pandaLoader = {
  loaders: ["./panda-turbopack-loader.cjs"],
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Workspace packages that export their TypeScript source
  transpilePackages: [
    "@isbatak/zag-wheel-picker",
    "@isbatak/ark-wheel-picker",
    "@isbatak/panda-ds",
    "@isbatak/panda-wheel-picker",
    "@isbatak/compositions",
  ],
  async redirects() {
    return [
      { source: "/docs/components/:slug", destination: "/components/:slug", permanent: true },
      { source: "/docs/:path*", destination: "/components", permanent: true },
    ]
  },
  turbopack: {
    rules: {
      ...codeInspectorPlugin({
        bundler: "turbopack",
        injectTo: resolve("components/providers.tsx"),
      }),
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
