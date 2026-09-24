import type { ComponentType } from "react"

import { WheelPickerPreview } from "./wheel-picker-preview"

// Docs pick their preview with the `preview` frontmatter field
export const previews: Record<string, ComponentType> = {
  "wheel-picker": WheelPickerPreview,
}
