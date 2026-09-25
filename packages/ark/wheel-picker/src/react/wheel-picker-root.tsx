import { ark, type HTMLProps, type PolymorphicProps } from "@ark-ui/react/factory"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { mergeProps } from "@zag-js/react"
import { forwardRef, type JSX, type RefAttributes } from "react"
import type { Assign } from "../types"
import { useWheelPicker, type UseWheelPickerProps } from "./use-wheel-picker"
import { WheelPickerProvider } from "./use-wheel-picker-context"

export interface WheelPickerRootBaseProps<T extends wheelPicker.CollectionItem>
  extends UseWheelPickerProps<T>, PolymorphicProps {}
export interface WheelPickerRootProps<T extends wheelPicker.CollectionItem> extends Assign<
  HTMLProps<"div">,
  WheelPickerRootBaseProps<T>
> {}

export type WheelPickerRootComponent = <T extends wheelPicker.CollectionItem>(
  props: WheelPickerRootProps<T> & RefAttributes<HTMLDivElement>,
) => JSX.Element

const WheelPickerRootImpl = forwardRef<HTMLDivElement, WheelPickerRootProps<wheelPicker.CollectionItem>>(
  (props, ref) => {
    const [useWheelPickerProps, localProps] = wheelPicker.splitProps(props as Omit<typeof props, "dir">)
    const api = useWheelPicker(useWheelPickerProps as UseWheelPickerProps)
    const mergedProps = mergeProps(api.getRootProps(), localProps)

    return (
      <WheelPickerProvider value={api}>
        <ark.div {...mergedProps} ref={ref} />
      </WheelPickerProvider>
    )
  },
)

WheelPickerRootImpl.displayName = "WheelPickerRoot"

export const WheelPickerRoot = WheelPickerRootImpl as WheelPickerRootComponent
