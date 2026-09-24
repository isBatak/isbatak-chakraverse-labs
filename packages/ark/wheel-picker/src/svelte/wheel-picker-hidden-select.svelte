<script module lang="ts">
  import type { Assign } from "../types"
  import type { HTMLProps, PolymorphicProps, RefAttribute } from "./types"

  export interface WheelPickerHiddenSelectBaseProps extends PolymorphicProps<"select">, RefAttribute {}
  export interface WheelPickerHiddenSelectProps extends Assign<HTMLProps<"select">, WheelPickerHiddenSelectBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from "@ark-ui/svelte"
  import { mergeProps } from "@zag-js/svelte"
  import { useWheelPickerContext } from "./use-wheel-picker-context"

  let { ref = $bindable(null), ...props }: WheelPickerHiddenSelectProps = $props()
  const api = useWheelPickerContext()
  const mergedProps = $derived(mergeProps(api().getHiddenSelectProps(), props))
</script>

<Ark as="select" bind:ref {...mergedProps}>
  {#each api().collection.items as item (api().collection.getItemValue(item))}
    <option value={api().collection.getItemValue(item) ?? ""} disabled={api().collection.getItemDisabled(item)}>
      {api().collection.stringifyItem(item)}
    </option>
  {/each}
</Ark>
