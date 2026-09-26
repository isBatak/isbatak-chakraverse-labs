"use client"

import { createContext, type ReactNode, useContext } from "react"
import { styled } from "styled-system/jsx"

import { Tabs } from "../ui/tabs"
import { TabsCopyButton } from "./copy-button"

export type CodeSurface = "prose" | "preview"

const CodeSurfaceContext = createContext<CodeSurface>("prose")

export const CodeSurfaceProvider = CodeSurfaceContext

const CodeTabsHeader = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    gap: "3",
  },
  variants: {
    surface: {
      prose: { alignItems: "flex-end" },
      preview: { alignItems: "center" },
    },
  },
})

interface CodeFile {
  name: string
  code: string
}

export function CodeTabs({ files, children }: { files: CodeFile[]; children: ReactNode }) {
  const surface = useContext(CodeSurfaceContext)

  return (
    <Tabs.Root
      className="not-prose"
      data-surface={surface}
      defaultValue={files[0]?.name}
      size="xs"
      variant={surface === "preview" ? "enclosed" : "folder"}
      my="6"
      css={{ "&[data-surface=preview]": { my: "0" } }}
    >
      <CodeTabsHeader surface={surface}>
        <Tabs.List minW="0" overflowX="auto">
          {files.map((file) => (
            <Tabs.Trigger key={file.name} value={file.name} fontFamily="mono">
              {file.name}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
        <TabsCopyButton files={Object.fromEntries(files.map((file) => [file.name, file.code]))} />
      </CodeTabsHeader>
      {children}
    </Tabs.Root>
  )
}
