import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/react/factory"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { mergeProps } from "@zag-js/react"
import { forwardRef } from "react"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerHighlightItemBaseProps extends wheelPicker.ItemProps, PolymorphicProps {}
export interface WheelPickerHighlightItemProps extends HTMLProps<"li">, WheelPickerHighlightItemBaseProps {}

export const WheelPickerHighlightItem = forwardRef<HTMLLIElement, WheelPickerHighlightItemProps>((props, ref) => {
  const [itemProps, localProps] = wheelPicker.splitItemProps(props)
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(api.getHighlightItemProps(itemProps), localProps)

  return <ark.li {...mergedProps} ref={ref} />
})

WheelPickerHighlightItem.displayName = "WheelPickerHighlightItem"
