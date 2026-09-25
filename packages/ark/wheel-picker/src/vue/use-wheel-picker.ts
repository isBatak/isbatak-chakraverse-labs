import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from "@ark-ui/vue/environment"
import { DEFAULT_LOCALE, useLocaleContext } from "@ark-ui/vue/locale"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, type PropTypes, useMachine } from "@zag-js/vue"
import { computed, type ComputedRef, type MaybeRefOrGetter, toValue, useId } from "vue"
import type { Optional } from "../types"

export interface UseWheelPickerProps<
  T extends wheelPicker.CollectionItem = wheelPicker.CollectionItem,
> extends Optional<Omit<wheelPicker.Props<T>, "dir" | "getRootNode" | "value">, "id"> {
  modelValue?: string | null | undefined
}

export interface UseWheelPickerReturn<
  T extends wheelPicker.CollectionItem = wheelPicker.CollectionItem,
> extends ComputedRef<wheelPicker.Api<PropTypes, T>> {}

export interface WheelPickerRootEmits<T extends wheelPicker.CollectionItem = wheelPicker.CollectionItem> {
  (event: "valueChange", details: wheelPicker.ValueChangeDetails<T>): void
  (event: "valueChangeEnd", details: wheelPicker.ValueChangeDetails<T>): void
  (event: "scrollChange", details: wheelPicker.ScrollChangeDetails<T>): void
  (event: "update:modelValue", value: string | null): void
}

const cleanProps = <T extends Record<string, unknown>>(props: T) =>
  Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined)) as T

export const useWheelPicker = <T extends wheelPicker.CollectionItem>(
  props: MaybeRefOrGetter<UseWheelPickerProps<T>>,
  emit?: WheelPickerRootEmits<T>,
): UseWheelPickerReturn<T> => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<wheelPicker.Props<T>>(() => {
    const { modelValue, ...localProps } = toValue(props)
    return {
      id,
      dir: locale.value.dir,
      getRootNode: env.value.getRootNode,
      value: modelValue,
      ...cleanProps(localProps),
      onValueChange(details) {
        emit?.("valueChange", details)
        emit?.("update:modelValue", details.value)
        localProps.onValueChange?.(details)
      },
      onValueChangeEnd(details) {
        emit?.("valueChangeEnd", details)
        localProps.onValueChangeEnd?.(details)
      },
      onScrollChange(details) {
        emit?.("scrollChange", details)
        localProps.onScrollChange?.(details)
      },
    }
  })

  const service = useMachine(wheelPicker.machine as wheelPicker.Machine<T>, context)
  return computed(() => wheelPicker.connect(service, normalizeProps))
}
