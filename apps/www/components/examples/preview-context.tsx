"use client"

import {
  createContext,
  startTransition,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"

const desktopQuery = "(min-width: 1024px)"

export function useIsDesktop() {
  return useSyncExternalStore<boolean | null>(
    (onChange) => {
      const mediaQuery = window.matchMedia(desktopQuery)
      mediaQuery.addEventListener("change", onChange)
      return () => mediaQuery.removeEventListener("change", onChange)
    },
    () => window.matchMedia(desktopQuery).matches,
    () => null,
  )
}

interface PreviewContextValue {
  defaultId: string | undefined
  activeId: string | undefined
  activeSource: ReactNode
  registerSource: (id: string, source: ReactNode) => () => void
  registerTrigger: (id: string, element: HTMLElement) => () => void
}

const PreviewContext = createContext<PreviewContextValue>({
  defaultId: undefined,
  activeId: undefined,
  activeSource: null,
  registerSource: () => () => {},
  registerTrigger: () => () => {},
})

export const usePreview = () => useContext(PreviewContext)

interface PreviewProviderProps {
  defaultId: string | undefined
  defaultSource: ReactNode
  children: ReactNode
}

export function PreviewProvider({ defaultId, defaultSource, children }: PreviewProviderProps) {
  const isDesktop = useIsDesktop()
  const [activeId, setActiveId] = useState(defaultId)
  const [sources, setSources] = useState<Record<string, ReactNode>>({})
  const [triggerCount, setTriggerCount] = useState(0)
  const triggers = useRef(new Map<HTMLElement, string>())

  const registerSource = useCallback((id: string, source: ReactNode) => {
    setSources((current) => ({ ...current, [id]: source }))
    return () => setSources(({ [id]: _removed, ...rest }) => rest)
  }, [])

  const registerTrigger = useCallback((id: string, element: HTMLElement) => {
    triggers.current.set(element, id)
    setTriggerCount((count) => count + 1)
    return () => {
      triggers.current.delete(element)
      setTriggerCount((count) => count - 1)
    }
  }, [])

  useEffect(() => {
    if (!isDesktop || triggerCount === 0) {
      setActiveId(defaultId)
      return
    }

    const update = () => {
      const line = window.innerHeight / 2
      const rects = [...triggers.current]
        .map(([element, id]) => ({ id, rect: element.getBoundingClientRect() }))
        .toSorted((a, b) => a.rect.top - b.rect.top)
      const hit = rects.find(({ rect }) => rect.top <= line && rect.bottom >= line)
      if (hit) startTransition(() => setActiveId(hit.id))
      else if (rects[0]!.rect.top > line || rects.at(-1)!.rect.bottom < line)
        startTransition(() => setActiveId(defaultId))
    }

    let frame = 0
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [isDesktop, triggerCount, defaultId])

  const activeSource = activeId === defaultId ? defaultSource : activeId && sources[activeId]

  return (
    <PreviewContext value={{ defaultId, activeId, activeSource, registerSource, registerTrigger }}>
      {children}
    </PreviewContext>
  )
}
