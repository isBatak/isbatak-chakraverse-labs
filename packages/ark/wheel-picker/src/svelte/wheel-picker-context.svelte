<script module lang="ts">
  import type { Snippet } from "svelte"
  import type { UseWheelPickerContext } from "./use-wheel-picker-context.js"

  export interface WheelPickerContextProps {
    render?: Snippet<[UseWheelPickerContext]>
  }
</script>

<script lang="ts">
  import { useWheelPickerContext } from "./use-wheel-picker-context.js"

  const { render }: WheelPickerContextProps = $props()
  const api = useWheelPickerContext()
</script>

{@render render?.(api)}
