import { createContext } from "@ark-ui/vue/utils"
import type { UseWheelPickerReturn } from "./use-wheel-picker"

export interface UseWheelPickerContext extends UseWheelPickerReturn {}

export const [WheelPickerProvider, useWheelPickerContext] = createContext<UseWheelPickerContext>("WheelPickerContext")
