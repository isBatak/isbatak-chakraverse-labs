import { createContext } from "@ark-ui/react/utils"
import type { UseWheelPickerReturn } from "./use-wheel-picker"

export interface UseWheelPickerContext extends UseWheelPickerReturn {}

export const [WheelPickerProvider, useWheelPickerContext] = createContext<UseWheelPickerContext>({
  name: "WheelPickerContext",
  hookName: "useWheelPickerContext",
  providerName: "<WheelPickerProvider />",
})
