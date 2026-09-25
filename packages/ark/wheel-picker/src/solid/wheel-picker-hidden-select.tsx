import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/solid/factory"
import { mergeProps } from "@zag-js/solid"
import { Index } from "solid-js"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerHiddenSelectBaseProps extends PolymorphicProps<"select"> {}
export interface WheelPickerHiddenSelectProps extends HTMLProps<"select">, WheelPickerHiddenSelectBaseProps {}

export const WheelPickerHiddenSelect = (props: WheelPickerHiddenSelectProps) => {
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(() => api().getHiddenSelectProps(), props)

  return (
    <ark.select {...mergedProps}>
      <Index each={api().collection.items}>
        {(item) => (
          <option
            value={api().collection.getItemValue(item()) ?? ""}
            disabled={api().collection.getItemDisabled(item())}
          >
            {api().collection.stringifyItem(item())}
          </option>
        )}
      </Index>
    </ark.select>
  )
}
