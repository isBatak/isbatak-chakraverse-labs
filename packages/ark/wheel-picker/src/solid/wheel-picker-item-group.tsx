import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/solid/factory"
import { mergeProps } from "@zag-js/solid"
import { useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerItemGroupBaseProps extends PolymorphicProps<"ul"> {}
export interface WheelPickerItemGroupProps extends HTMLProps<"ul">, WheelPickerItemGroupBaseProps {}

export const WheelPickerItemGroup = (props: WheelPickerItemGroupProps) => {
  const api = useWheelPickerContext()
  const mergedProps = mergeProps(() => api().getItemGroupProps(), props)

  return <ark.ul {...mergedProps} />
}
