"use client"

import Link from "next/link"
import { styled } from "styled-system/jsx"

import { Icon } from "../ui/icon"
import { createPreference } from "./preference"

export type LayerId = "zag" | "ark"

const useLayerPreference = createPreference<LayerId, null>("docs-layer", ["zag", "ark"], null)

export function useLayer() {
  const [layer, setLayer] = useLayerPreference()
  return { layer, setLayer }
}

const layerNames: Record<LayerId, string> = {
  zag: "just the life",
  ark: "bones and life",
}

interface LayerGuide {
  slug: string
  label: string
  permalink: string
}

export function LayerGuideHint({ guides, current }: { guides: LayerGuide[]; current?: string | undefined }) {
  const { layer } = useLayer()
  const guide = guides.find(({ slug }) => slug === layer)
  if (!layer || !guide || guide.slug === current) return null

  return (
    <styled.p display="flex" alignItems="center" gap="2" mt="4" textStyle="sm" color="fg.muted">
      You picked {layerNames[layer]}.
      <styled.span
        display="inline-flex"
        alignItems="center"
        gap="1"
        color="fg"
        _hover={{ textDecoration: "underline" }}
      >
        <Link href={guide.permalink}>Read the {guide.label} guide</Link>
        <Icon name="arrow-right" />
      </styled.span>
    </styled.p>
  )
}
