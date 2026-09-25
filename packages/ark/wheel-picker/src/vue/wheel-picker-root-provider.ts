import { ark } from "@ark-ui/vue/factory"
import { type Component, defineComponent, h, type PropType } from "vue"
import type { UseWheelPickerReturn } from "./use-wheel-picker"
import { WheelPickerProvider } from "./use-wheel-picker-context"

export const WheelPickerRootProvider = defineComponent({
  name: "WheelPickerRootProvider",
  props: {
    asChild: Boolean,
    value: { type: Object as PropType<UseWheelPickerReturn>, required: true },
  },
  setup(props, { slots }) {
    WheelPickerProvider(props.value)

    return () => h(ark.div as Component, { ...props.value.value.getRootProps(), asChild: props.asChild }, slots)
  },
})
