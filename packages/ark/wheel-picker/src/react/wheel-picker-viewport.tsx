import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/react/factory"
import { mergeProps } from "@zag-js/react"
import { forwardRef } from "react"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerViewportBaseProps extends PolymorphicProps {}
export interface WheelPickerViewportProps extends HTMLProps<"div">, WheelPickerViewportBaseProps {}

export const WheelPickerViewport = forwardRef<HTMLDivElement, WheelPickerViewportProps>((props, ref) => {
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(api.getViewportProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

WheelPickerViewport.displayName = "WheelPickerViewport"
