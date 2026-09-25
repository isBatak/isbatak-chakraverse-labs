<script module lang="ts">
  import type { ItemProps } from "@isbatak/zag-wheel-picker"
  import type { Assign } from "../types.js"
  import type { HTMLProps, PolymorphicProps, RefAttribute } from "./types.js"

  export interface WheelPickerHighlightItemBaseProps extends ItemProps, PolymorphicProps<"li">, RefAttribute {}
  export interface WheelPickerHighlightItemProps extends Assign<HTMLProps<"li">, WheelPickerHighlightItemBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from "@ark-ui/svelte"
  import * as wheelPicker from "@isbatak/zag-wheel-picker"
  import { mergeProps } from "@zag-js/svelte"
  import { useWheelPickerContext } from "./use-wheel-picker-context.js"

  let { ref = $bindable(null), ...props }: WheelPickerHighlightItemProps = $props()
  const [itemProps, localProps] = $derived(wheelPicker.splitItemProps(props))
  const api = useWheelPickerContext()
  const mergedProps = $derived(mergeProps(api().getHighlightItemProps(itemProps), localProps))
</script>

<Ark as="li" bind:ref {...mergedProps} />
