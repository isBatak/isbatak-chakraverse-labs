import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/react/factory"
import { mergeProps } from "@zag-js/react"
import { forwardRef } from "react"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerControlBaseProps extends PolymorphicProps {}
export interface WheelPickerControlProps extends HTMLProps<"div">, WheelPickerControlBaseProps {}

export const WheelPickerControl = forwardRef<HTMLDivElement, WheelPickerControlProps>((props, ref) => {
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(api.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

WheelPickerControl.displayName = "WheelPickerControl"
