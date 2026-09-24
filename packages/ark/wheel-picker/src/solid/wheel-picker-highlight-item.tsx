import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/solid/factory"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { mergeProps } from "@zag-js/solid"
import { splitProps } from "solid-js"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerHighlightItemBaseProps extends wheelPicker.ItemProps, PolymorphicProps<"li"> {}
export interface WheelPickerHighlightItemProps extends HTMLProps<"li">, WheelPickerHighlightItemBaseProps {}

export const WheelPickerHighlightItem = (props: WheelPickerHighlightItemProps) => {
  const [itemProps, localProps] = splitProps(props, ["item", "index"])
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(() => api().getHighlightItemProps(itemProps), localProps)

  return <ark.li {...mergedProps} />
}
