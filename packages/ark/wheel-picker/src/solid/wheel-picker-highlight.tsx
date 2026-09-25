import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/solid/factory"
import { mergeProps } from "@zag-js/solid"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerHighlightBaseProps extends PolymorphicProps<"div"> {}
export interface WheelPickerHighlightProps extends HTMLProps<"div">, WheelPickerHighlightBaseProps {}

export const WheelPickerHighlight = (props: WheelPickerHighlightProps) => {
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(() => api().getHighlightProps(), props)

  return <ark.div {...mergedProps} />
}
