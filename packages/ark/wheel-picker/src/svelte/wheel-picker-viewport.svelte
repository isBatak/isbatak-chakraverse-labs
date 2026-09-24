<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from "./types"

  export interface WheelPickerViewportBaseProps extends PolymorphicProps<"div">, RefAttribute {}
  export interface WheelPickerViewportProps extends HTMLProps<"div">, WheelPickerViewportBaseProps {}
</script>

<script lang="ts">
  import { Ark } from "@ark-ui/svelte"
  import { mergeProps } from "@zag-js/svelte"
  import { useWheelPickerContext } from "./use-wheel-picker-context"

  let { ref = $bindable(null), ...props }: WheelPickerViewportProps = $props()
  const api = useWheelPickerContext()
  const mergedProps = $derived(mergeProps(api().getViewportProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
