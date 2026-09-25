import { ark } from "@ark-ui/vue/factory"
import { type Component, defineComponent, h } from "vue"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export const WheelPickerItemGroup = defineComponent({
  name: "WheelPickerItemGroup",
  props: {
    asChild: Boolean,
  },
  setup(props, { slots }) {
    const api = useWheelPickerContext()

    return () => h(ark.ul as Component, { ...api.value.getItemGroupProps(), asChild: props.asChild }, slots)
  },
})
