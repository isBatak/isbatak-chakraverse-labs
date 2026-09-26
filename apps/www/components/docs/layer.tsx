"use client"

import { createPreference } from "./preference"

export type LayerId = "zag" | "ark"

const useLayerPreference = createPreference<LayerId, null>("docs-layer", ["zag", "ark"], null)

export function useLayer() {
  const [layer, setLayer] = useLayerPreference()
  return { layer, setLayer }
}
