import { CodeBlock } from "../code/code-block"
import { FrameworkSwitch } from "./framework"

const jsxUsage = `import { WheelPickerBasic } from "./components/wheel-picker-basic/wheel-picker-basic"

export function App() {
  return <WheelPickerBasic />
}`

const vueUsage = `<script setup lang="ts">
import WheelPickerBasic from "./components/wheel-picker-basic/wheel-picker-basic.vue"
</script>

<template>
  <WheelPickerBasic />
</template>`

const svelteUsage = `<script lang="ts">
  import WheelPickerBasic from "$lib/components/wheel-picker-basic/wheel-picker-basic.svelte"
</script>

<WheelPickerBasic />`

const vanillaUsage = `import { createWheelPickerBasic } from "./components/wheel-picker-basic/wheel-picker-basic"

createWheelPickerBasic(document.querySelector("#app")!)`

export function WheelPickerUsage() {
  return (
    <FrameworkSwitch
      react={<CodeBlock lang="tsx" code={jsxUsage} />}
      vue={<CodeBlock lang="vue" code={vueUsage} />}
      svelte={<CodeBlock lang="svelte" code={svelteUsage} />}
      solid={<CodeBlock lang="tsx" code={jsxUsage} />}
      preact={<CodeBlock lang="tsx" code={jsxUsage} />}
      vanilla={<CodeBlock lang="ts" code={vanillaUsage} />}
    />
  )
}
