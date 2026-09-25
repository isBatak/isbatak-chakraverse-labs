import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/solid/factory"
import { mergeProps } from "@zag-js/solid"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerViewportBaseProps extends PolymorphicProps<"div"> {}
export interface WheelPickerViewportProps extends HTMLProps<"div">, WheelPickerViewportBaseProps {}

export const WheelPickerViewport = (props: WheelPickerViewportProps) => {
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(() => api().getViewportProps(), props)

  return <ark.div {...mergedProps} />
}
