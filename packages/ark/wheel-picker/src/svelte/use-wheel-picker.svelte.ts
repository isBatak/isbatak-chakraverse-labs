import { useEnvironmentContext, useLocaleContext } from "@ark-ui/svelte"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, type PropTypes, useMachine } from "@zag-js/svelte"

export interface UseWheelPickerProps<T extends wheelPicker.CollectionItem = wheelPicker.CollectionItem> extends Omit<
  wheelPicker.Props<T>,
  "dir" | "getRootNode"
> {}

export interface UseWheelPickerReturn<T extends wheelPicker.CollectionItem = wheelPicker.CollectionItem> {
  (): wheelPicker.Api<PropTypes, T>
}

export const useWheelPicker = <T extends wheelPicker.CollectionItem>(
  props: UseWheelPickerProps<T> | (() => UseWheelPickerProps<T>),
): UseWheelPickerReturn<T> => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by<wheelPicker.Props<T>>(() => ({
    dir: locale().dir,
    getRootNode: env().getRootNode,
    ...(typeof props === "function" ? props() : props),
  }))

  const service = useMachine(wheelPicker.machine as wheelPicker.Machine<T>, () => machineProps)
  const api = $derived(wheelPicker.connect(service, normalizeProps))

  return () => api
}
