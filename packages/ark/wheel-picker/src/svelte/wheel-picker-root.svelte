<script module lang="ts">
  import type { CollectionItem } from "@isbatak/zag-wheel-picker"
  import type { Assign, Optional } from "../types"
  import type { HTMLProps, PolymorphicProps, RefAttribute } from "./types"
  import type { UseWheelPickerProps } from "./use-wheel-picker.svelte"

  export interface WheelPickerRootBaseProps<T extends CollectionItem = CollectionItem>
    extends Optional<UseWheelPickerProps<T>, "id">,
      PolymorphicProps<"div">,
      RefAttribute {}
  export interface WheelPickerRootProps<T extends CollectionItem = CollectionItem>
    extends Assign<HTMLProps<"div">, WheelPickerRootBaseProps<T>> {}
</script>

<script lang="ts" generics="T extends CollectionItem">
  import { Ark } from "@ark-ui/svelte"
  import * as wheelPicker from "@isbatak/zag-wheel-picker"
  import { mergeProps } from "@zag-js/svelte"
  import { WheelPickerProvider } from "./use-wheel-picker-context"
  import { useWheelPicker } from "./use-wheel-picker.svelte"

  let { ref = $bindable(null), value = $bindable(), ...props }: WheelPickerRootProps<T> = $props()
  const providedId = $props.id()

  const [useWheelPickerProps, localProps] = $derived(wheelPicker.splitProps(props as Omit<typeof props, "dir">))

  const resolvedProps = $derived({
    ...useWheelPickerProps,
    id: useWheelPickerProps.id ?? providedId,
    value,
    onValueChange(details: wheelPicker.ValueChangeDetails<T>) {
      useWheelPickerProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  } as UseWheelPickerProps<T>)

  const api = useWheelPicker(() => resolvedProps)
  const mergedProps = $derived(mergeProps(api().getRootProps(), localProps))

  WheelPickerProvider(api as never)
</script>

<Ark as="div" bind:ref {...mergedProps} />
