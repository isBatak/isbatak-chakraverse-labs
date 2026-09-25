"use client"

import { type ReactNode, useEffect, useRef } from "react"
import { styled } from "styled-system/jsx"

import { ExampleView } from "./example-view"
import { useIsDesktop, usePreview } from "./preview-context"

interface ExampleTriggerProps {
  id: string
  source: ReactNode
  children?: ReactNode
}

export function ExampleTrigger({ id, source, children }: ExampleTriggerProps) {
  const { defaultId, activeId, registerSource, registerTrigger } = usePreview()
  const isDesktop = useIsDesktop()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => registerSource(id, source), [id, source, registerSource])
  useEffect(() => registerTrigger(id, ref.current!), [id, registerTrigger])

  const inline = isDesktop === false || !defaultId

  return (
    <styled.div
      ref={ref}
      data-active={activeId === id && !inline ? "" : undefined}
      my="6"
      ps={{ lg: "5" }}
      borderStartWidth={{ lg: "2px" }}
      borderColor="border"
      transition="border-color 0.2s"
      css={{ "&[data-active]": { borderColor: "fg" } }}
    >
      {children}
      {inline && (
        <>
          <styled.div
            className="not-prose"
            display="grid"
            placeItems="center"
            py="8"
            my="6"
            borderRadius="l3"
            borderWidth="1px"
            bg="bg"
          >
            <ExampleView id={id} />
          </styled.div>
          {source}
        </>
      )}
    </styled.div>
  )
}
