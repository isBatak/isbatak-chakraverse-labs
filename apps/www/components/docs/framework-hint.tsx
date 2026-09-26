"use client"

import { Portal } from "@ark-ui/react/portal"
import { type ReactNode, useEffect } from "react"

import { Button } from "../ui/button"
import { Hint } from "../ui/hint"
import { Tooltip } from "../ui/tooltip"
import { Tour, useTour } from "../ui/tour"

const dismiss: Tour.StepAction = { label: "Got it", action: "dismiss" }

export function FrameworkHint({ children }: { children: ReactNode }) {
  const tour = useTour({
    steps: [
      {
        id: "framework-picker",
        type: "tooltip",
        target: () => document.querySelector<HTMLElement>("[data-framework-picker]"),
        title: "Pick your framework",
        description:
          "Switch between React, Vue, Svelte, Solid, Preact and vanilla JS. The preview, code and install steps follow your pick.",
        placement: "bottom-start",
        arrow: true,
        actions: [dismiss],
      },
    ],
  })

  useEffect(() => {
    if (!tour.open) return
    const { style } = document.documentElement
    const { overflow, scrollbarGutter } = style
    style.overflow = "hidden"
    style.scrollbarGutter = "stable"
    return () => {
      style.overflow = overflow
      style.scrollbarGutter = scrollbarGutter
    }
  }, [tour.open])

  return (
    <>
      <Hint.Root>
        <Tooltip.Root openDelay={200} positioning={{ placement: "top" }} lazyMount unmountOnExit>
          <Tooltip.Trigger asChild>
            <Hint.Trigger onClick={() => tour.start()}>
              {children}
              <Hint.Icon name="focus" />
            </Hint.Trigger>
          </Tooltip.Trigger>
          <Portal>
            <Tooltip.Positioner>
              <Tooltip.Content>Show me where</Tooltip.Content>
            </Tooltip.Positioner>
          </Portal>
        </Tooltip.Root>
      </Hint.Root>
      <Tour.Root tour={tour} lazyMount unmountOnExit>
        <Portal>
          <Tour.Backdrop />
          <Tour.Spotlight />
          <Tour.Positioner>
            <Tour.Content>
              <Tour.Arrow>
                <Tour.ArrowTip />
              </Tour.Arrow>
              <Tour.Title />
              <Tour.Description />
              <Tour.Control>
                <Tour.ActionTrigger action={dismiss} aria-label={dismiss.label} asChild>
                  <Button size="xs">{dismiss.label}</Button>
                </Tour.ActionTrigger>
              </Tour.Control>
            </Tour.Content>
          </Tour.Positioner>
        </Portal>
      </Tour.Root>
    </>
  )
}
