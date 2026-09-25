import type { ReactNode } from "react"
import { type UseWheelPickerContext, useWheelPickerContext } from "./use-wheel-picker-context"

export interface WheelPickerContextProps {
  children: (context: UseWheelPickerContext) => ReactNode
}

export const WheelPickerContext = (props: WheelPickerContextProps) => props.children(useWheelPickerContext())
