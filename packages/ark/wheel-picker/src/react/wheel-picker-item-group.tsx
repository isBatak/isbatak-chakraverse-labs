import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/react/factory"
import { mergeProps } from "@zag-js/react"
import { forwardRef } from "react"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerItemGroupBaseProps extends PolymorphicProps {}
export interface WheelPickerItemGroupProps extends HTMLProps<"ul">, WheelPickerItemGroupBaseProps {}

export const WheelPickerItemGroup = forwardRef<HTMLUListElement, WheelPickerItemGroupProps>((props, ref) => {
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(api.getItemGroupProps(), props)

  return <ark.ul {...mergedProps} ref={ref} />
})

WheelPickerItemGroup.displayName = "WheelPickerItemGroup"
