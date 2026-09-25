import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/solid/factory"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { mergeProps } from "@zag-js/solid"
import { splitProps } from "solid-js"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerItemBaseProps extends wheelPicker.ItemProps, PolymorphicProps<"li"> {}
export interface WheelPickerItemProps extends HTMLProps<"li">, WheelPickerItemBaseProps {}

export const WheelPickerItem = (props: WheelPickerItemProps) => {
  const [itemProps, localProps] = splitProps(props, ["item", "index"])
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return <ark.li {...mergedProps} />
}
