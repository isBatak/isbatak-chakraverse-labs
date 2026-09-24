import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/react/factory"
import { mergeProps } from "@zag-js/react"
import { forwardRef } from "react"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerLabelBaseProps extends PolymorphicProps {}
export interface WheelPickerLabelProps extends HTMLProps<"label">, WheelPickerLabelBaseProps {}

export const WheelPickerLabel = forwardRef<HTMLLabelElement, WheelPickerLabelProps>((props, ref) => {
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(api.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

WheelPickerLabel.displayName = "WheelPickerLabel"
