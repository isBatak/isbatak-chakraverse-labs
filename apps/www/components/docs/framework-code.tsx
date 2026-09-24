import manifest from "@isbatak/compositions/manifest.json"
import { styled } from "styled-system/jsx"

import { CodeBlock, CodeBody, CodeFrame, CodeHeader } from "../code/code-block"
import { CopyButton } from "../code/copy-button"
import { ExampleView } from "../examples/example-view"
import { Tabs } from "../ui/tabs"
import { type FrameworkId, FrameworkPicker, FrameworkSwitch } from "./framework"
import { SITE_URL } from "./site-url"

type ExampleFiles = (typeof manifest.examples)[number]["frameworks"]["react"]

const getExample = (id: string, framework: FrameworkId): ExampleFiles | undefined =>
  manifest.examples.find((example) => example.id === id)?.frameworks[framework]

const frameworkLabel = (framework: FrameworkId) => manifest.frameworks.find(({ id }) => id === framework)!.label

export const registryUrl = (example: string, framework: FrameworkId) => `${SITE_URL}/r/${example}-${framework}.json`

const Unavailable = styled("p", {
  base: {
    p: "4",
    textStyle: "sm",
    color: "fg.muted",
  },
})

interface ExampleProps {
  id: string
}

function InstallCommand({ id, framework }: ExampleProps & { framework: FrameworkId }) {
  const example = getExample(id, framework)
  if (!example) return <Unavailable>Not available for {frameworkLabel(framework)} yet.</Unavailable>
  return <CodeBlock lang="sh" code={`pnpm add ${example.dependencies.join(" ")}`} />
}

export function FrameworkInstall({ id }: ExampleProps) {
  return (
    <FrameworkSwitch
      react={<InstallCommand id={id} framework="react" />}
      vue={<InstallCommand id={id} framework="vue" />}
      svelte={<InstallCommand id={id} framework="svelte" />}
      solid={<InstallCommand id={id} framework="solid" />}
      preact={<InstallCommand id={id} framework="preact" />}
      vanilla={<InstallCommand id={id} framework="vanilla" />}
    />
  )
}

function RegistryCommand({ id, framework }: ExampleProps & { framework: FrameworkId }) {
  if (!getExample(id, framework)) return <Unavailable>Not available for {frameworkLabel(framework)} yet.</Unavailable>
  return <CodeBlock lang="sh" code={`pnpm dlx shadcn@latest add ${registryUrl(id, framework)}`} />
}

export function FrameworkRegistry({ id }: ExampleProps) {
  return (
    <FrameworkSwitch
      react={<RegistryCommand id={id} framework="react" />}
      vue={<RegistryCommand id={id} framework="vue" />}
      svelte={<RegistryCommand id={id} framework="svelte" />}
      solid={<RegistryCommand id={id} framework="solid" />}
      preact={<RegistryCommand id={id} framework="preact" />}
      vanilla={<RegistryCommand id={id} framework="vanilla" />}
    />
  )
}

const FileActions = styled("div", {
  base: {
    position: "absolute",
    top: "2",
    insetEnd: "2",
  },
})

function ExampleFilesTabs({ id, framework }: ExampleProps & { framework: FrameworkId }) {
  const example = getExample(id, framework)
  if (!example) return <Unavailable>Not available for {frameworkLabel(framework)} yet.</Unavailable>

  return (
    <Tabs.Root key={framework} defaultValue={example.files[0]!.name} size="sm" variant="line">
      <CodeHeader>
        <Tabs.List borderBottomWidth="0">
          {example.files.map((file) => (
            <Tabs.Trigger key={file.name} value={file.name}>
              {file.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </CodeHeader>
      {example.files.map((file) => (
        <Tabs.Content key={file.name} value={file.name} position="relative" pt="0">
          <CodeBody code={file.code} lang={file.lang} />
          <FileActions>
            <CopyButton value={file.code} />
          </FileActions>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}

function ExampleFiles({ id }: ExampleProps) {
  return (
    <FrameworkSwitch
      react={<ExampleFilesTabs id={id} framework="react" />}
      vue={<ExampleFilesTabs id={id} framework="vue" />}
      svelte={<ExampleFilesTabs id={id} framework="svelte" />}
      solid={<ExampleFilesTabs id={id} framework="solid" />}
      preact={<ExampleFilesTabs id={id} framework="preact" />}
      vanilla={<ExampleFilesTabs id={id} framework="vanilla" />}
    />
  )
}

export function ExampleCode({ id }: ExampleProps) {
  return (
    <CodeFrame>
      <CodeHeader overflowX="auto" py="2">
        <FrameworkPicker />
      </CodeHeader>
      <ExampleFiles id={id} />
    </CodeFrame>
  )
}

export function Example({ id }: ExampleProps) {
  return (
    <CodeFrame>
      <CodeHeader overflowX="auto" py="2">
        <FrameworkPicker />
      </CodeHeader>
      <styled.div display="grid" placeItems="center" py="8" borderBottomWidth="1px" bg="bg">
        <ExampleView id={id} />
      </styled.div>
      <ExampleFiles id={id} />
    </CodeFrame>
  )
}
