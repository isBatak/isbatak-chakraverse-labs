import { ark } from "@ark-ui/vue/factory"
import { type Component, defineComponent, h } from "vue"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export const WheelPickerControl = defineComponent({
  name: "WheelPickerControl",
  props: {
    asChild: Boolean,
  },
  setup(props, { slots }) {
    const api = useWheelPickerContext()

    return () => h(ark.div as Component, { ...api.value.getControlProps(), asChild: props.asChild }, slots)
  },
})
