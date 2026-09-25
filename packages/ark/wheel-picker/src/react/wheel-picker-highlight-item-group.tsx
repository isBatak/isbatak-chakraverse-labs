import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/react/factory"
import { mergeProps } from "@zag-js/react"
import { forwardRef } from "react"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerHighlightItemGroupBaseProps extends PolymorphicProps {}
export interface WheelPickerHighlightItemGroupProps extends HTMLProps<"ul">, WheelPickerHighlightItemGroupBaseProps {}

export const WheelPickerHighlightItemGroup = forwardRef<HTMLUListElement, WheelPickerHighlightItemGroupProps>(
  (props, ref) => {
    const api = useWheelPickerContext()
    const mergedProps = mergeProps(api.getHighlightItemGroupProps(), props)

    return <ark.ul {...mergedProps} ref={ref} />
  },
)

WheelPickerHighlightItemGroup.displayName = "WheelPickerHighlightItemGroup"
