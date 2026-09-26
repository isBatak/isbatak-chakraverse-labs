"use client"

import type { ReactNode } from "react"

import { createPreference } from "./preference"

export type FrameworkId = "react" | "vue" | "svelte" | "solid" | "preact" | "vanilla"

const useFrameworkPreference = createPreference<FrameworkId, FrameworkId>(
  "docs-framework",
  ["react", "vue", "svelte", "solid", "preact", "vanilla"],
  "react",
)

export function useFramework() {
  const [framework, setFramework] = useFrameworkPreference()
  return { framework, setFramework }
}

export type FrameworkSwitchProps = Record<FrameworkId, ReactNode>

export function FrameworkSwitch(props: FrameworkSwitchProps) {
  const { framework } = useFramework()
  return props[framework]
}
