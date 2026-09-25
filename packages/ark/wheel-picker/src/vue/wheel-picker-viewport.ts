import { ark } from "@ark-ui/vue/factory"
import { type Component, defineComponent, h } from "vue"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export const WheelPickerViewport = defineComponent({
  name: "WheelPickerViewport",
  props: {
    asChild: Boolean,
  },
  setup(props, { slots }) {
    const api = useWheelPickerContext()

    return () => h(ark.div as Component, { ...api.value.getViewportProps(), asChild: props.asChild }, slots)
  },
})
