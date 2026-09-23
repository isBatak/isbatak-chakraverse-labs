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
  },
}

export default nextConfig
