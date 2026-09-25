<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from "./types.js"

  export interface WheelPickerItemGroupBaseProps extends PolymorphicProps<"ul">, RefAttribute {}
  export interface WheelPickerItemGroupProps extends HTMLProps<"ul">, WheelPickerItemGroupBaseProps {}
</script>

<script lang="ts">
  import { Ark } from "@ark-ui/svelte"
  import { mergeProps } from "@zag-js/svelte"
  import { useWheelPickerContext } from "./use-wheel-picker-context.js"

  let { ref = $bindable(null), ...props }: WheelPickerItemGroupProps = $props()
  const api = useWheelPickerContext()
  const mergedProps = $derived(mergeProps(api().getItemGroupProps(), props))
</script>

<Ark as="ul" bind:ref {...mergedProps} />
