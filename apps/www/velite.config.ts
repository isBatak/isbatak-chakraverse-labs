import { defineCollection, defineConfig, s } from "velite"

const docs = defineCollection({
  name: "Doc",
  pattern: "docs/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      order: s.number().default(0),
      preview: s.string().optional(),
      path: s.path(),
      toc: s.toc(),
      metadata: s.metadata(),
      code: s.mdx(),
    })
    .transform(({ path, ...data }) => {
      const slug = path.replace(/^docs\//, "")
      return { ...data, slug, permalink: `/docs/${slug}` }
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
  collections: { docs },
})
