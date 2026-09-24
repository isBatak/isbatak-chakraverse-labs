import manifest from "@isbatak/compositions/manifest.json"

export const dynamic = "force-static"
export const dynamicParams = false

const items = manifest.examples.flatMap((example) =>
  manifest.frameworks.flatMap((framework) => {
    const files = example.frameworks[framework.id as keyof typeof example.frameworks]
    return files ? [{ name: `${example.id}-${framework.id}`, example: example.id, framework, ...files }] : []
  }),
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
    title: `${item.example} (${item.framework.label})`,
    description: `The ${item.example} example for ${item.framework.label}, built on Zag.`,
    dependencies: item.dependencies,
    files: item.files.map((file) => ({
      path: `registry/${item.framework.id}/${file.name}`,
      type: "registry:file",
      target: `~/${file.target}`,
      content: file.code,
    })),
  })
}
