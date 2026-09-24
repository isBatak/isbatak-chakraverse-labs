<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from "./types"

  export interface WheelPickerLabelBaseProps extends PolymorphicProps<"label">, RefAttribute {}
  export interface WheelPickerLabelProps extends HTMLProps<"label">, WheelPickerLabelBaseProps {}
</script>

<script lang="ts">
  import { Ark } from "@ark-ui/svelte"
  import { mergeProps } from "@zag-js/svelte"
  import { useWheelPickerContext } from "./use-wheel-picker-context"

  let { ref = $bindable(null), ...props }: WheelPickerLabelProps = $props()
  const api = useWheelPickerContext()
  const mergedProps = $derived(mergeProps(api().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
