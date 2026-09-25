"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"

import { SegmentGroup } from "../ui/segment-group"

export type StylingId = "panda" | "css"

const storageKey = "docs-styling"

const StylingContext = createContext<{ styling: StylingId; setStyling: (id: StylingId) => void }>({
  styling: "panda",
  setStyling: () => {},
})

export function StylingProvider({ children }: { children: ReactNode }) {
  const [styling, setStylingState] = useState<StylingId>("panda")

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored === "panda" || stored === "css") setStylingState(stored)
    } catch {}
  }, [])

  const setStyling = (id: StylingId) => {
    setStylingState(id)
    try {
      localStorage.setItem(storageKey, id)
    } catch {}
  }

  return <StylingContext value={{ styling, setStyling }}>{children}</StylingContext>
}

export const useStyling = () => useContext(StylingContext)

export type StylingSwitchProps = Record<StylingId, ReactNode>

export function StylingSwitch(props: StylingSwitchProps) {
  const { styling } = useStyling()
  return props[styling]
}

export function StylingPicker() {
  const { styling, setStyling } = useStyling()

  return (
    <SegmentGroup.Root
      size="xs"
      orientation="horizontal"
      aria-label="Styling"
      value={styling}
      onValueChange={(details) => details.value && setStyling(details.value as StylingId)}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Item value="panda">
        <SegmentGroup.ItemText>Panda CSS</SegmentGroup.ItemText>
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
      <SegmentGroup.Item value="css">
        <SegmentGroup.ItemText>CSS</SegmentGroup.ItemText>
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </SegmentGroup.Root>
  )
}
