<script module lang="ts">
  import type { ItemProps } from "@isbatak/zag-wheel-picker"
  import type { Assign } from "../types"
  import type { HTMLProps, PolymorphicProps, RefAttribute } from "./types"

  export interface WheelPickerItemBaseProps extends ItemProps, PolymorphicProps<"li">, RefAttribute {}
  export interface WheelPickerItemProps extends Assign<HTMLProps<"li">, WheelPickerItemBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from "@ark-ui/svelte"
  import * as wheelPicker from "@isbatak/zag-wheel-picker"
  import { mergeProps } from "@zag-js/svelte"
  import { useWheelPickerContext } from "./use-wheel-picker-context"

  let { ref = $bindable(null), ...props }: WheelPickerItemProps = $props()
  const [itemProps, localProps] = $derived(wheelPicker.splitItemProps(props))
  const api = useWheelPickerContext()
  const mergedProps = $derived(mergeProps(api().getItemProps(itemProps), localProps))
</script>

<Ark as="li" bind:ref {...mergedProps} />
