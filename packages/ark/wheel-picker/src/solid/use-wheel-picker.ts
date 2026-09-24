import { useEnvironmentContext } from "@ark-ui/solid/environment"
import { useLocaleContext } from "@ark-ui/solid/locale"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, type PropTypes, useMachine } from "@zag-js/solid"
import { type Accessor, createMemo, createUniqueId } from "solid-js"
import type { Optional } from "../types"

export interface UseWheelPickerProps<
  T extends wheelPicker.CollectionItem = wheelPicker.CollectionItem,
> extends Optional<Omit<wheelPicker.Props<T>, "dir" | "getRootNode">, "id"> {}

export interface UseWheelPickerReturn<
  T extends wheelPicker.CollectionItem = wheelPicker.CollectionItem,
> extends Accessor<wheelPicker.Api<PropTypes, T>> {}

type MaybeAccessor<T> = T | Accessor<T>

export const useWheelPicker = <T extends wheelPicker.CollectionItem>(
  props: MaybeAccessor<UseWheelPickerProps<T>>,
): UseWheelPickerReturn<T> => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<wheelPicker.Props<T>>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...(typeof props === "function" ? props() : props),
  }))

  const service = useMachine(wheelPicker.machine as wheelPicker.Machine<T>, machineProps)
  return createMemo(() => wheelPicker.connect(service, normalizeProps))
}
