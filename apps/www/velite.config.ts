import { defineCollection, defineConfig, s } from "velite"

const components = defineCollection({
  name: "Component",
  pattern: "components/*/index.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      order: s.number().default(0),
      category: s.string(),
      status: s.enum(["new", "beta", "stable"]).optional(),
      preview: s.string().optional(),
      links: s
        .object({
          source: s.string().optional(),
          storybook: s.string().optional(),
          recipe: s.string().optional(),
          ark: s.string().optional(),
        })
        .default({}),
      path: s.path(),
      toc: s.toc(),
      metadata: s.metadata(),
      raw: s.raw(),
      code: s.mdx(),
    })
    .transform(({ path, ...data }) => {
      const slug = path.replace(/^components\//, "")
      return { ...data, slug, permalink: `/components/${slug}` }
    }),
})

const componentGuides = defineCollection({
  name: "ComponentGuide",
  pattern: ["components/*/*.mdx", "!components/*/index.mdx"],
  schema: s
    .object({
      title: s.string().max(99),
      label: s.string().max(30),
      description: s.string().max(999).optional(),
      order: s.number().default(0),
      preview: s.string().optional(),
      path: s.path(),
      toc: s.toc(),
      metadata: s.metadata(),
      raw: s.raw(),
      code: s.mdx(),
    })
    .transform(({ path, ...data }) => {
      const [component = "", slug = ""] = path.replace(/^components\//, "").split("/")
      return { ...data, component, slug, permalink: `/components/${component}/${slug}` }
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
  collections: { components, componentGuides },
})
