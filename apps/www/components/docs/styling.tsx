"use client"

import type { ReactNode } from "react"

import { SegmentGroup } from "../ui/segment-group"
import { createPreference } from "./preference"

export type StylingId = "panda" | "css"

const useStylingPreference = createPreference<StylingId, StylingId>("docs-styling", ["panda", "css"], "panda")

export function useStyling() {
  const [styling, setStyling] = useStylingPreference()
  return { styling, setStyling }
}

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
