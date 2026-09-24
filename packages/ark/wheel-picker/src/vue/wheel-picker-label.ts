import { ark } from "@ark-ui/vue/factory"
import { type Component, defineComponent, h } from "vue"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export const WheelPickerLabel = defineComponent({
  name: "WheelPickerLabel",
  props: {
    asChild: Boolean,
  },
  setup(props, { slots }) {
    const api = useWheelPickerContext()

    return () => h(ark.label as Component, { ...api.value.getLabelProps(), asChild: props.asChild }, slots)
  },
})
