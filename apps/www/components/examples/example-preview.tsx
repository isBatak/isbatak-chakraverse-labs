"use client"

import { styled } from "styled-system/jsx"

import { FrameworkPicker } from "../docs/framework"
import { ExampleView } from "./example-view"

export function ExamplePreview({ id }: { id: string }) {
  return (
    <styled.div position="relative" display="grid" placeItems="center" w="full" h="full">
      <styled.div position="absolute" top="3" insetX="3" display="flex" justifyContent="center" overflowX="auto">
        <FrameworkPicker />
      </styled.div>
      <ExampleView id={id} />
    </styled.div>
  )
}
