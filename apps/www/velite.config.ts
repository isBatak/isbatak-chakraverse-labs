import { defineCollection, defineConfig, s } from "velite"

const components = defineCollection({
  name: "Component",
  pattern: "components/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      order: s.number().default(0),
      category: s.string(),
      status: s.enum(["new", "beta", "stable"]).optional(),
      preview: s.string().optional(),
      path: s.path(),
      toc: s.toc(),
      metadata: s.metadata(),
      code: s.mdx(),
    })
    .transform(({ path, ...data }) => {
      const slug = path.replace(/^components\//, "")
      return { ...data, slug, permalink: `/components/${slug}` }
    }),
})

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { components },
})
