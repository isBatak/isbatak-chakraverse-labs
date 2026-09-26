"use client"

import { useSyncExternalStore } from "react"

const listeners = new Set<() => void>()
const unsaved = new Map<string, string>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

function readStored(key: string) {
  if (unsaved.has(key)) return unsaved.get(key)
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStored(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
    unsaved.delete(key)
  } catch {
    unsaved.set(key, value)
  }
  for (const listener of listeners) listener()
}

export function createPreference<T extends string, F extends T | null>(
  storageKey: string,
  values: readonly T[],
  fallback: F,
) {
  const isValue = (value: unknown): value is T => values.includes(value as T)
  const getSnapshot = (): T | F => {
    const stored = readStored(storageKey)
    return isValue(stored) ? stored : fallback
  }
  const getServerSnapshot = () => fallback
  const setValue = (value: T) => writeStored(storageKey, value)

  return function usePreference() {
    const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
    return [value, setValue] as const
  }
}
