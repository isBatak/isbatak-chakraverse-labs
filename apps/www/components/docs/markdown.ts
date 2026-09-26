import { components } from "#site/content"
import manifest from "@isbatak/compositions/manifest.json"

import api from "../../data/api.json"
import { formatType } from "./api-table"
import type { FrameworkId } from "./framework"
import { registryUrl } from "./registry"
import { SITE_URL } from "./site-url"
import type { StylingId } from "./styling"

type Attributes = Record<string, string>

interface ApiMember {
  type: string
  description: string
  defaultValue?: string
}

export const markdownPath = (permalink: string) => `${permalink}.md`

const fence = (lang: string, code: string) => `\`\`\`${lang}\n${code}\n\`\`\``

const parseAttributes = (source: string): Attributes =>
  Object.fromEntries(Array.from(source.matchAll(/(\w+)="([^"]*)"/g), ([, key = "", value = ""]) => [key, value]))

const variantsOf = (id: string) => {
  const example = manifest.examples.find((entry) => entry.id === id)
  return manifest.frameworks.flatMap((framework) =>
    manifest.stylings.flatMap((styling) => {
      const files = example?.frameworks[framework.id as FrameworkId]?.[styling.id as StylingId]
      return files ? [{ framework, styling, files }] : []
    }),
  )
}

const installation = ({ id = "" }: Attributes) =>
  [
    "Add the component with the shadcn CLI, using the registry item for your framework and styling:",
    fence(
      "sh",
      variantsOf(id)
        .map(
          ({ framework, styling }) =>
            `# ${framework.label}, ${styling.label}\npnpm dlx shadcn@latest add ${registryUrl(id, framework.id as FrameworkId, styling.id as StylingId)}`,
        )
        .join("\n\n"),
    ),
    "With Panda CSS, add `wheelPickerPreset` from `@isbatak/panda-wheel-picker` to your Panda config.",
  ].join("\n\n")

const frameworkInstall = ({ id = "" }: Attributes) =>
  fence(
    "sh",
    variantsOf(id)
      .filter(({ styling }) => styling.id === "css")
      .map(({ framework, files }) => `# ${framework.label}\npnpm add ${files.dependencies.join(" ")}`)
      .join("\n\n"),
  )

const exampleCode = ({ id = "" }: Attributes) =>
  [
    "Full source for each framework, as shadcn registry items:",
    variantsOf(id)
      .filter(({ styling }) => styling.id === "css")
      .map(({ framework }) => `- [${framework.label}](${registryUrl(id, framework.id as FrameworkId, "css")})`)
      .join("\n"),
  ].join("\n\n")

const escapeCell = (value: string) => value.replaceAll("|", "\\|").replaceAll("\n", " ")

const apiTable = ({ name = "", kind = "" }: Attributes) => {
  const members = Object.entries(
    (api[name as keyof typeof api]?.[kind as "context" | "api"] ?? {}) as Record<string, ApiMember>,
  )
  return [
    `| ${kind === "context" ? "Prop" : "Property"} | Type | Default | Description |`,
    "| --- | --- | --- | --- |",
    ...members.map(
      ([key, member]) =>
        `| \`${key}\` | \`${escapeCell(formatType(member.type))}\` | ${member.defaultValue ? `\`${escapeCell(member.defaultValue)}\`` : "—"} | ${escapeCell(member.description)} |`,
    ),
  ].join("\n")
}

const renderers: Record<string, (attributes: Attributes) => string> = {
  ApiTable: apiTable,
  ExampleCode: exampleCode,
  FrameworkInstall: frameworkInstall,
  Installation: installation,
}

const renderProse = (prose: string) =>
  prose
    .replace(/<\/?([A-Z]\w*)([^>]*?)\/?>/g, (_, tag: string, attributes: string) =>
      renderers[tag] ? renderers[tag](parseAttributes(attributes)) : "",
    )
    .replaceAll("](/", `](${SITE_URL}/`)

const renderBody = (raw: string) =>
  raw
    .split(/(^```[\s\S]*?^```)/m)
    .map((part, index) => (index % 2 === 1 ? part : renderProse(part)))
    .join("")

const toMarkdown = (title: string, description: string | undefined, raw: string) =>
  `${[`# ${title}`, description, renderBody(raw)]
    .filter(Boolean)
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()}\n`

export const markdownParams = () => components.map((doc) => ({ slug: [doc.slug] }))

export function getMarkdown([slug, ...rest]: string[]) {
  const component = components.find((doc) => doc.slug === slug)
  if (!component || rest.length > 0) return undefined
  return toMarkdown(component.title, component.description, component.raw)
}
