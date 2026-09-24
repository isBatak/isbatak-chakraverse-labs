import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/solid/factory"
import { mergeProps } from "@zag-js/solid"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerHighlightItemGroupBaseProps extends PolymorphicProps<"ul"> {}
export interface WheelPickerHighlightItemGroupProps extends HTMLProps<"ul">, WheelPickerHighlightItemGroupBaseProps {}

export const WheelPickerHighlightItemGroup = (props: WheelPickerHighlightItemGroupProps) => {
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(() => api().getHighlightItemGroupProps(), props)

  return <ark.ul {...mergedProps} />
}
