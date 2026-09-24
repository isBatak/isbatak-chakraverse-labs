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

const folderOf = (example: ExampleFiles) => example.files[0]!.target.replace(/[^/]+$/, "")

function CliInstall({ id, framework }: ExampleProps & { framework: FrameworkId }) {
  const example = getExample(id, framework)
  if (!example) return <Unavailable>Not available for {frameworkLabel(framework)} yet.</Unavailable>

  return (
    <>
      <CodeBlock lang="sh" code={`pnpm dlx shadcn@latest add ${registryUrl(id, framework)}`} />
      <p>
        This installs the dependencies and adds the component with its stylesheet to <code>{folderOf(example)}</code>.
        It works in any project, with or without a <code>components.json</code>.
      </p>
    </>
  )
}

function ManualInstall({ id, framework }: ExampleProps & { framework: FrameworkId }) {
  const example = getExample(id, framework)
  if (!example) return <Unavailable>Not available for {frameworkLabel(framework)} yet.</Unavailable>

  return (
    <ol>
      <li>
        Install the dependencies:
        <CodeBlock lang="sh" code={`pnpm add ${example.dependencies.join(" ")}`} />
      </li>
      <li>
        Copy these files into <code>{folderOf(example)}</code>:
        <CodeFrame>
          <ExampleFilesTabs id={id} framework={framework} />
        </CodeFrame>
      </li>
    </ol>
  )
}

export function Installation({ id }: ExampleProps) {
  return (
    <styled.div my="6">
      <styled.div overflowX="auto" pb="1">
        <FrameworkPicker />
      </styled.div>
      <Tabs.Root defaultValue="cli" size="sm" variant="line" mt="4">
        <Tabs.List>
          <Tabs.Trigger value="cli">shadcn CLI</Tabs.Trigger>
          <Tabs.Trigger value="manual">Manual</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="cli">
          <FrameworkSwitch
            react={<CliInstall id={id} framework="react" />}
            vue={<CliInstall id={id} framework="vue" />}
            svelte={<CliInstall id={id} framework="svelte" />}
            solid={<CliInstall id={id} framework="solid" />}
            preact={<CliInstall id={id} framework="preact" />}
            vanilla={<CliInstall id={id} framework="vanilla" />}
          />
        </Tabs.Content>
        <Tabs.Content value="manual">
          <FrameworkSwitch
            react={<ManualInstall id={id} framework="react" />}
            vue={<ManualInstall id={id} framework="vue" />}
            svelte={<ManualInstall id={id} framework="svelte" />}
            solid={<ManualInstall id={id} framework="solid" />}
            preact={<ManualInstall id={id} framework="preact" />}
            vanilla={<ManualInstall id={id} framework="vanilla" />}
          />
        </Tabs.Content>
      </Tabs.Root>
    </styled.div>
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

export function ExampleSource({ id }: ExampleProps) {
  return (
    <CodeFrame>
      <ExampleFiles id={id} />
    </CodeFrame>
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
