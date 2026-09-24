import { ark } from "@ark-ui/vue/factory"
import { type Component, defineComponent, h } from "vue"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export const WheelPickerHiddenSelect = defineComponent({
  name: "WheelPickerHiddenSelect",
  setup() {
    const api = useWheelPickerContext()

    return () => {
      const { collection } = api.value
      return h(ark.select as Component, api.value.getHiddenSelectProps(), () =>
        collection.items.map((item) => {
          const value = collection.getItemValue(item) ?? ""
          return h(
            "option",
            { key: value, value, disabled: collection.getItemDisabled(item) },
            collection.stringifyItem(item) ?? "",
          )
        }),
      )
    }
  },
})
