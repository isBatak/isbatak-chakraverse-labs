import type { JSX } from "solid-js"
import { type UseWheelPickerContext, useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerContextProps {
  children: (context: UseWheelPickerContext) => JSX.Element
}

export const WheelPickerContext = (props: WheelPickerContextProps) => props.children(useWheelPickerContext())
