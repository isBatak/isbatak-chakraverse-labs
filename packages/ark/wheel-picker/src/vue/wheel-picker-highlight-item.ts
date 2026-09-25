import { ark } from "@ark-ui/vue/factory"
import type * as wheelPicker from "@isbatak/zag-wheel-picker"
import { type Component, defineComponent, h, type PropType } from "vue"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export const WheelPickerHighlightItem = defineComponent({
  name: "WheelPickerHighlightItem",
  props: {
    asChild: Boolean,
    index: { type: Number, required: true },
    item: { type: null as unknown as PropType<wheelPicker.CollectionItem>, required: true },
  },
  setup(props, { slots }) {
    const api = useWheelPickerContext()

    return () =>
      h(
        ark.li as Component,
        { ...api.value.getHighlightItemProps({ item: props.item, index: props.index }), asChild: props.asChild },
        slots,
      )
  },
})
