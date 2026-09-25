import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/solid/factory"
import { mergeProps } from "@zag-js/solid"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerLabelBaseProps extends PolymorphicProps<"label"> {}
export interface WheelPickerLabelProps extends HTMLProps<"label">, WheelPickerLabelBaseProps {}

export const WheelPickerLabel = (props: WheelPickerLabelProps) => {
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
