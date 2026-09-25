import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/react/factory"
import { mergeProps } from "@zag-js/react"
import { forwardRef } from "react"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerHighlightBaseProps extends PolymorphicProps {}
export interface WheelPickerHighlightProps extends HTMLProps<"div">, WheelPickerHighlightBaseProps {}

export const WheelPickerHighlight = forwardRef<HTMLDivElement, WheelPickerHighlightProps>((props, ref) => {
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(api.getHighlightProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

WheelPickerHighlight.displayName = "WheelPickerHighlight"
