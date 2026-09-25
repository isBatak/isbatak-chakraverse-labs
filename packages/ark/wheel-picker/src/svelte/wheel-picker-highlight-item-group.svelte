<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from "./types.js"

  export interface WheelPickerHighlightItemGroupBaseProps extends PolymorphicProps<"ul">, RefAttribute {}
  export interface WheelPickerHighlightItemGroupProps extends HTMLProps<"ul">, WheelPickerHighlightItemGroupBaseProps {}
</script>

<script lang="ts">
  import { Ark } from "@ark-ui/svelte"
  import { mergeProps } from "@zag-js/svelte"
  import { useWheelPickerContext } from "./use-wheel-picker-context.js"

  let { ref = $bindable(null), ...props }: WheelPickerHighlightItemGroupProps = $props()
  const api = useWheelPickerContext()
  const mergedProps = $derived(mergeProps(api().getHighlightItemGroupProps(), props))
</script>

<Ark as="ul" bind:ref {...mergedProps} />
