export interface WheelPickerControls {
  disabled: boolean
  readOnly: boolean
  invalid: boolean
  infinite: boolean
  dir: "ltr" | "rtl"
  visibleCount: number
  optionItemHeight: number
  dragSensitivity: number
  scrollSensitivity: number
}

/** Defaults mirror the machine's own defaults (see `wheel-picker.machine.ts`). */
export const wheelPickerArgs: WheelPickerControls = {
  disabled: false,
  readOnly: false,
  invalid: false,
  infinite: false,
  dir: "ltr",
  visibleCount: 20,
  optionItemHeight: 30,
  dragSensitivity: 5,
  scrollSensitivity: 5,
}

export const wheelPickerArgTypes = {
  disabled: { control: "boolean" },
  readOnly: { control: "boolean" },
  invalid: { control: "boolean" },
  infinite: { control: "boolean" },
  dir: { control: "inline-radio", options: ["ltr", "rtl"] },
  visibleCount: { control: { type: "number", min: 4 } },
  optionItemHeight: { control: { type: "number", min: 1 } },
  dragSensitivity: { control: { type: "number", min: 1 } },
  scrollSensitivity: { control: { type: "number", min: 1 } },
  onValueChange: { table: { disable: true } },
} as const

export const locales = ["en-US", "en-GB", "fr-FR", "de-DE", "cs-CZ", "ja-JP", "mk-MK", "zh-CN"] as const

export type Locale = (typeof locales)[number]

export interface TimeInputControls {
  locale: Locale
}

export const timeInputArgs: TimeInputControls = { locale: "en-US" }

export const timeInputArgTypes = {
  locale: { control: "select", options: locales },
} as const
