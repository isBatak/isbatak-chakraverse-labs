<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from "./types.js"

  export interface WheelPickerHighlightBaseProps extends PolymorphicProps<"div">, RefAttribute {}
  export interface WheelPickerHighlightProps extends HTMLProps<"div">, WheelPickerHighlightBaseProps {}
</script>

<script lang="ts">
  import { Ark } from "@ark-ui/svelte"
  import { mergeProps } from "@zag-js/svelte"
  import { useWheelPickerContext } from "./use-wheel-picker-context.js"

  let { ref = $bindable(null), ...props }: WheelPickerHighlightProps = $props()
  const api = useWheelPickerContext()
  const mergedProps = $derived(mergeProps(api().getHighlightProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
