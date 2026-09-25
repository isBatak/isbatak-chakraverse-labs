import manifest from "@isbatak/compositions/manifest.json"

import type { FrameworkId } from "../../../components/docs/framework"
import { registryName } from "../../../components/docs/registry"
import type { StylingId } from "../../../components/docs/styling"

export const dynamic = "force-static"
export const dynamicParams = false

const items = manifest.examples.flatMap((example) =>
  manifest.frameworks.flatMap((framework) =>
    manifest.stylings.flatMap((styling) => {
      const files = example.frameworks[framework.id as FrameworkId]?.[styling.id as StylingId]
      return files
        ? [
            {
              name: registryName(example.id, framework.id as FrameworkId, styling.id as StylingId),
              example: example.id,
              framework,
              styling,
              ...files,
            },
          ]
        : []
    }),
  ),
)

export function generateStaticParams() {
  return items.map(({ name }) => ({ name: `${name}.json` }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const item = items.find((entry) => `${entry.name}.json` === name)
  if (!item) return new Response("Not found", { status: 404 })

  return Response.json({
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: "registry:item",
    title: `${item.example} (${item.framework.label}, ${item.styling.label})`,
    description: `The ${item.example} example for ${item.framework.label}, built on Zag and styled with ${item.styling.label}.`,
    dependencies: item.dependencies,
    devDependencies: item.devDependencies,
    files: item.files.map((file) => ({
      path: `registry/${item.framework.id}/${item.styling.id}/${file.name}`,
      type: "registry:file",
      target: `~/${file.target}`,
      content: file.code,
    })),
  })
}
