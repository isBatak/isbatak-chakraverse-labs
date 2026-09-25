import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/solid/factory"
import { mergeProps } from "@zag-js/solid"
import { splitProps } from "solid-js"
import type { Assign } from "../types"
import type { UseWheelPickerReturn } from "./use-wheel-picker"
import { WheelPickerProvider } from "./use-wheel-picker-context"

interface RootProviderProps {
  value: UseWheelPickerReturn
}

export interface WheelPickerRootProviderBaseProps extends RootProviderProps, PolymorphicProps<"div"> {}
export interface WheelPickerRootProviderProps extends Assign<HTMLProps<"div">, WheelPickerRootProviderBaseProps> {}

export const WheelPickerRootProvider = (props: WheelPickerRootProviderProps) => {
  const [{ value: api }, localProps] = splitProps(props, ["value"])
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <WheelPickerProvider value={api}>
      <ark.div {...mergedProps} />
    </WheelPickerProvider>
  )
}
