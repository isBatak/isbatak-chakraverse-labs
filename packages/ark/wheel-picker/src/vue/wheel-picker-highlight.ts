import { ark } from "@ark-ui/vue/factory"
import { type Component, defineComponent, h } from "vue"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export const WheelPickerHighlight = defineComponent({
  name: "WheelPickerHighlight",
  props: {
    asChild: Boolean,
  },
  setup(props, { slots }) {
    const api = useWheelPickerContext()

    return () => h(ark.div as Component, { ...api.value.getHighlightProps(), asChild: props.asChild }, slots)
  },
})
