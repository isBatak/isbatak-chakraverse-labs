"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"

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
