<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from "./types"

  export interface WheelPickerControlBaseProps extends PolymorphicProps<"div">, RefAttribute {}
  export interface WheelPickerControlProps extends HTMLProps<"div">, WheelPickerControlBaseProps {}
</script>

<script lang="ts">
  import { Ark } from "@ark-ui/svelte"
  import { mergeProps } from "@zag-js/svelte"
  import { useWheelPickerContext } from "./use-wheel-picker-context"

  let { ref = $bindable(null), ...props }: WheelPickerControlProps = $props()
  const api = useWheelPickerContext()
  const mergedProps = $derived(mergeProps(api().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
