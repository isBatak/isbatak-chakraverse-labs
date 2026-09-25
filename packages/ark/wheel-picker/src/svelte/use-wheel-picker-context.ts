import { createContext } from "@ark-ui/svelte"
import type { UseWheelPickerReturn } from "./use-wheel-picker.svelte.js"

export interface UseWheelPickerContext extends UseWheelPickerReturn {}

export const [WheelPickerProvider, useWheelPickerContext] = createContext<UseWheelPickerContext>({
  name: "WheelPickerContext",
})
