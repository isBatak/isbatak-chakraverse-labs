import { ark } from "@ark-ui/vue/factory"
import type * as wheelPicker from "@isbatak/zag-wheel-picker"
import { type Component, defineComponent, h, type PropType } from "vue"
import { useWheelPicker, type UseWheelPickerReturn } from "./use-wheel-picker"
import { WheelPickerProvider } from "./use-wheel-picker-context"

const booleanProp = { type: Boolean, default: undefined }

export const WheelPickerRoot = defineComponent({
  name: "WheelPickerRoot",
  props: {
    "aria-label": String,
    "aria-labelledby": String,
    asChild: Boolean,
    collection: { type: Object as PropType<wheelPicker.Props["collection"]>, required: true },
    defaultValue: { type: String as PropType<string | null>, default: undefined },
    disabled: booleanProp,
    dragSensitivity: Number,
    form: String,
    id: String,
    ids: Object as PropType<wheelPicker.ElementIds>,
    infinite: booleanProp,
    invalid: booleanProp,
    modelValue: { type: String as PropType<string | null>, default: undefined },
    name: String,
    optionItemHeight: Number,
    readOnly: booleanProp,
    required: booleanProp,
    scrollSensitivity: Number,
    visibleCount: Number,
  },
  emits: {
    valueChange: (_details: wheelPicker.ValueChangeDetails) => true,
    valueChangeEnd: (_details: wheelPicker.ValueChangeDetails) => true,
    scrollChange: (_details: wheelPicker.ScrollChangeDetails) => true,
    "update:modelValue": (_value: string | null) => true,
  },
  setup(props, { emit, slots }) {
    const api = useWheelPicker(() => {
      const { asChild: _, ...machineProps } = props
      return machineProps
    }, emit as never)
    WheelPickerProvider(api as UseWheelPickerReturn)

    return () => h(ark.div as Component, { ...api.value.getRootProps(), asChild: props.asChild }, slots)
  },
})
