"use client"

import { examples } from "@isbatak/compositions/react"
import "@isbatak/compositions/styles.css"
import { useEffect, useRef } from "react"

import { type FrameworkId, useFramework } from "../docs/framework"
import { DemoTheme } from "./demo-theme"

type MountModule = { mount: (id: string, container: HTMLElement) => () => void }

const loaders: Record<Exclude<FrameworkId, "react">, () => Promise<MountModule>> = {
  vue: () => import("@isbatak/compositions/vue"),
  svelte: () => import("@isbatak/compositions/svelte"),
  solid: () => import("@isbatak/compositions/solid"),
  preact: () => import("@isbatak/compositions/preact"),
  vanilla: () => import("@isbatak/compositions/vanilla"),
}

function MountedExample({ id, load }: { id: string; load: () => Promise<MountModule> }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let unmount: (() => void) | undefined
    load().then(({ mount }) => {
      if (!cancelled && ref.current) unmount = mount(id, ref.current)
    })
    return () => {
      cancelled = true
      unmount?.()
    }
  }, [id, load])

  return <div ref={ref} />
}

export function ExampleView({ id }: { id: string }) {
  const { framework } = useFramework()
  const Example = examples[id]

  return (
    <DemoTheme>
      {framework === "react" ? (
        Example && <Example />
      ) : (
        <MountedExample key={framework} id={id} load={loaders[framework]} />
      )}
    </DemoTheme>
  )
}

export function ExampleThumbnail({ id }: { id: string }) {
  const Example = examples[id]

  return (
    <DemoTheme inert aria-hidden>
      {Example && <Example />}
    </DemoTheme>
  )
}
