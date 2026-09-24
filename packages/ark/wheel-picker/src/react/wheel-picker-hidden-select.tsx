import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/react/factory"
import { mergeProps } from "@zag-js/react"
import { forwardRef } from "react"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerHiddenSelectBaseProps extends PolymorphicProps {}
export interface WheelPickerHiddenSelectProps extends HTMLProps<"select">, WheelPickerHiddenSelectBaseProps {}

export const WheelPickerHiddenSelect = forwardRef<HTMLSelectElement, WheelPickerHiddenSelectProps>((props, ref) => {
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(api.getHiddenSelectProps(), props)
  const { collection } = api

  return (
    <ark.select {...mergedProps} ref={ref}>
      {collection.items.map((item) => {
        const value = collection.getItemValue(item) ?? ""
        return (
          <option key={value} value={value} disabled={collection.getItemDisabled(item)}>
            {collection.stringifyItem(item)}
          </option>
        )
      })}
    </ark.select>
  )
})

WheelPickerHiddenSelect.displayName = "WheelPickerHiddenSelect"
