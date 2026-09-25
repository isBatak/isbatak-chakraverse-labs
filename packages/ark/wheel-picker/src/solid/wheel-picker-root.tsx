import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/solid/factory"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { mergeProps } from "@zag-js/solid"
import { type JSX, splitProps } from "solid-js"
import type { Assign } from "../types"
import { useWheelPicker, type UseWheelPickerProps, type UseWheelPickerReturn } from "./use-wheel-picker"
import { WheelPickerProvider } from "./use-wheel-picker-context"

export interface WheelPickerRootBaseProps<T extends wheelPicker.CollectionItem>
  extends UseWheelPickerProps<T>, PolymorphicProps<"div"> {}
export interface WheelPickerRootProps<T extends wheelPicker.CollectionItem> extends Assign<
  HTMLProps<"div">,
  WheelPickerRootBaseProps<T>
> {}

export const WheelPickerRoot = <T extends wheelPicker.CollectionItem>(props: WheelPickerRootProps<T>): JSX.Element => {
  const [useWheelPickerProps, localProps] = splitProps(props, wheelPicker.props as (keyof WheelPickerRootProps<T>)[])
  const api = useWheelPicker(useWheelPickerProps as UseWheelPickerProps<T>)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <WheelPickerProvider value={api as unknown as UseWheelPickerReturn}>
      <ark.div {...mergedProps} />
    </WheelPickerProvider>
  )
}
