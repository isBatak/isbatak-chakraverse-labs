"use client"

import type { ReactNode } from "react"

import { Tabs } from "../ui/tabs"
import { createPreference } from "./preference"

export type InstallMethodId = "cli" | "manual"

const useInstallMethodPreference = createPreference<InstallMethodId, InstallMethodId>(
  "docs-install",
  ["cli", "manual"],
  "cli",
)

export function useInstallMethod() {
  const [installMethod, setInstallMethod] = useInstallMethodPreference()
  return { installMethod, setInstallMethod }
}

export function InstallMethodTabs({ children }: { children: ReactNode }) {
  const { installMethod, setInstallMethod } = useInstallMethod()

  return (
    <Tabs.Root
      variant="line"
      size="sm"
      my="6"
      value={installMethod}
      onValueChange={(details) => setInstallMethod(details.value as InstallMethodId)}
    >
      {children}
    </Tabs.Root>
  )
}
