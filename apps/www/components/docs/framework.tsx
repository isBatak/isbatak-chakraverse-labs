"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"

import { SegmentGroup } from "../ui/segment-group"

export type FrameworkId = "react" | "vue" | "svelte" | "solid" | "preact" | "vanilla"

const storageKey = "docs-framework"

const FrameworkContext = createContext<{ framework: FrameworkId; setFramework: (id: FrameworkId) => void }>({
  framework: "react",
  setFramework: () => {},
})

export function FrameworkProvider({ children }: { children: ReactNode }) {
  const [framework, setFrameworkState] = useState<FrameworkId>("react")

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) setFrameworkState(stored as FrameworkId)
    } catch {}
  }, [])

  const setFramework = (id: FrameworkId) => {
    setFrameworkState(id)
    try {
      localStorage.setItem(storageKey, id)
    } catch {}
  }

  return <FrameworkContext value={{ framework, setFramework }}>{children}</FrameworkContext>
}

export const useFramework = () => useContext(FrameworkContext)

export type FrameworkSwitchProps = Record<FrameworkId, ReactNode>

export function FrameworkSwitch(props: FrameworkSwitchProps) {
  const { framework } = useFramework()
  return props[framework]
}

export function FrameworkPicker() {
  const { framework, setFramework } = useFramework()

  return (
    <SegmentGroup.Root
      size="xs"
      orientation="horizontal"
      aria-label="Framework"
      value={framework}
      onValueChange={(details) => details.value && setFramework(details.value as FrameworkId)}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Item value="react">
        <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
      <SegmentGroup.Item value="vue">
        <SegmentGroup.ItemText>Vue</SegmentGroup.ItemText>
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
      <SegmentGroup.Item value="svelte">
        <SegmentGroup.ItemText>Svelte</SegmentGroup.ItemText>
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
      <SegmentGroup.Item value="solid">
        <SegmentGroup.ItemText>Solid</SegmentGroup.ItemText>
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
      <SegmentGroup.Item value="preact">
        <SegmentGroup.ItemText>Preact</SegmentGroup.ItemText>
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
      <SegmentGroup.Item value="vanilla">
        <SegmentGroup.ItemText>Vanilla</SegmentGroup.ItemText>
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </SegmentGroup.Root>
  )
}
