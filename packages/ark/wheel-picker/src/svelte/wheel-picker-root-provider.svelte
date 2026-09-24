<script module lang="ts">
  import type { Assign } from "../types"
  import type { HTMLProps, PolymorphicProps, RefAttribute } from "./types"
  import type { UseWheelPickerReturn } from "./use-wheel-picker.svelte"

  interface RootProviderProps {
    value: UseWheelPickerReturn
  }

  export interface WheelPickerRootProviderBaseProps extends RootProviderProps, PolymorphicProps<"div">, RefAttribute {}
  export interface WheelPickerRootProviderProps extends Assign<HTMLProps<"div">, WheelPickerRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from "@ark-ui/svelte"
  import { mergeProps } from "@zag-js/svelte"
  import { WheelPickerProvider } from "./use-wheel-picker-context"

  let { ref = $bindable(null), value: api, ...localProps }: WheelPickerRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(api().getRootProps(), localProps))

  WheelPickerProvider(() => api())
</script>

<Ark as="div" bind:ref {...mergedProps} />
