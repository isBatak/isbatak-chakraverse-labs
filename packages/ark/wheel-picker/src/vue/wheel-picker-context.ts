import { defineComponent, type SlotsType } from "vue"
import { type UseWheelPickerContext, useWheelPickerContext } from "./use-wheel-picker-context"

export const WheelPickerContext = defineComponent({
  name: "WheelPickerContext",
  slots: Object as SlotsType<{ default: UseWheelPickerContext["value"] }>,
  setup(_, { slots }) {
    const api = useWheelPickerContext()

    return () => slots.default?.(api.value)
  },
})
