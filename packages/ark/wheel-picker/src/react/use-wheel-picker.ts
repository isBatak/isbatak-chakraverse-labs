import { useEnvironmentContext } from "@ark-ui/react/environment"
import { useLocaleContext } from "@ark-ui/react/locale"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, type PropTypes, useMachine } from "@zag-js/react"
import { useId } from "react"
import type { Optional } from "../types"

export interface UseWheelPickerProps<
  T extends wheelPicker.CollectionItem = wheelPicker.CollectionItem,
> extends Optional<Omit<wheelPicker.Props<T>, "dir" | "getRootNode">, "id"> {}

export interface UseWheelPickerReturn<
  T extends wheelPicker.CollectionItem = wheelPicker.CollectionItem,
> extends wheelPicker.Api<PropTypes, T> {}

export const useWheelPicker = <T extends wheelPicker.CollectionItem>(
  props: UseWheelPickerProps<T>,
): UseWheelPickerReturn<T> => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: wheelPicker.Props<T> = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(wheelPicker.machine as wheelPicker.Machine<T>, machineProps)
  return wheelPicker.connect(service, normalizeProps)
}
