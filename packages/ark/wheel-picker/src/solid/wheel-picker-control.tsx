import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/solid/factory"
import { mergeProps } from "@zag-js/solid"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerControlBaseProps extends PolymorphicProps<"div"> {}
export interface WheelPickerControlProps extends HTMLProps<"div">, WheelPickerControlBaseProps {}

export const WheelPickerControl = (props: WheelPickerControlProps) => {
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
