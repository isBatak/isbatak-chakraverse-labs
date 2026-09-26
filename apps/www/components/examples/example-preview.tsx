"use client"

import { resetSnapshot } from "@isbatak/compositions/react"
import { startTransition, useEffect, useRef, useState, ViewTransition } from "react"
import { flushSync } from "react-dom"
import { viewTransition } from "styled-system/css"
import { styled } from "styled-system/jsx"

import { CodeSurfaceProvider } from "../code/code-tabs"
import { StylingPicker } from "../docs/styling"
import { ExampleView } from "./example-view"
import { usePreview } from "./preview-context"
import { PreviewToolbar } from "./preview-toolbar"

const easing = "cubic-bezier(0.32, 0.72, 0, 1)"

const rectKeyframe = ({ top, left, width, height }: DOMRect) => ({
  top: `${top}px`,
  left: `${left}px`,
  width: `${width}px`,
  height: `${height}px`,
  right: "auto",
  bottom: "auto",
})

const backdrop = (visible: boolean) => `0 0 0 100vmax ${visible ? "var(--colors-bg)" : "transparent"}`

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function ExamplePreview() {
  const { activeId, activeSource } = usePreview()
  const [fullscreen, setFullscreen] = useState(false)
  const [showSource, setShowSource] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)

  const changeFullscreen = (next: boolean) => {
    const root = rootRef.current
    const slot = root?.parentElement
    if (!root || !slot || next === fullscreen || animationRef.current) return

    if (prefersReducedMotion()) {
      setFullscreen(next)
      return
    }

    const collapsed = slot.getBoundingClientRect()

    if (next) {
      flushSync(() => setFullscreen(true))
      const expanded = root.getBoundingClientRect()
      animationRef.current = root.animate(
        [
          { ...rectKeyframe(collapsed), boxShadow: backdrop(false) },
          { ...rectKeyframe(expanded), boxShadow: backdrop(true) },
        ],
        { duration: 400, easing },
      )
    } else {
      const expanded = root.getBoundingClientRect()
      animationRef.current = root.animate(
        [
          { ...rectKeyframe(expanded), boxShadow: backdrop(true) },
          { ...rectKeyframe(collapsed), boxShadow: backdrop(false) },
        ],
        { duration: 320, easing, fill: "forwards" },
      )
    }

    const animation = animationRef.current
    animation.finished
      .then(() => {
        if (!next) flushSync(() => setFullscreen(false))
        animation.cancel()
      })
      .catch(() => {})
      .finally(() => {
        animationRef.current = null
      })
  }

  useEffect(() => {
    if (!fullscreen) return
    const { overflow } = document.documentElement.style
    document.documentElement.style.overflow = "hidden"
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && changeFullscreen(false)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.documentElement.style.overflow = overflow
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [fullscreen])

  return (
    <styled.div
      ref={rootRef}
      data-fullscreen={fullscreen ? "" : undefined}
      position="relative"
      display="grid"
      placeItems="center"
      w="full"
      h="full"
      css={{
        "&[data-fullscreen]": {
          position: "fixed",
          inset: "3",
          zIndex: "overlay",
          w: "auto",
          h: "auto",
          overflow: "hidden",
          borderRadius: "l3",
          borderWidth: "1px",
          bg: "bg.subtle",
          boxShadow: "0 0 0 100vmax {colors.bg}",
        },
      }}
    >
      <styled.div position="absolute" top="3" insetEnd="3" zIndex="1">
        <PreviewToolbar
          fullscreen={fullscreen}
          onFullscreenChange={changeFullscreen}
          showSource={showSource}
          onShowSourceChange={(next) => startTransition(() => setShowSource(next))}
          onReset={() => {
            if (activeId) resetSnapshot(activeId)
            startTransition(() => setResetKey((key) => key + 1))
          }}
        />
      </styled.div>
      <styled.div position="absolute" bottom="3" insetStart="3" zIndex="1">
        <StylingPicker />
      </styled.div>
      <ViewTransition
        key={`${activeId}-${resetKey}`}
        enter={viewTransition("scale-fade")}
        exit={viewTransition("scale-fade")}
        default={viewTransition("fade")}
      >
        <div hidden={showSource}>{activeId && <ExampleView id={activeId} />}</div>
      </ViewTransition>
      {showSource && (
        <ViewTransition enter={viewTransition("fade")} exit={viewTransition("fade")}>
          <styled.div
            key={activeId}
            position="absolute"
            inset="0"
            overflowY="auto"
            overscrollBehavior="contain"
            px="3"
            pt="16"
            pb="14"
          >
            <CodeSurfaceProvider value="preview">{activeSource}</CodeSurfaceProvider>
          </styled.div>
        </ViewTransition>
      )}
    </styled.div>
  )
}
