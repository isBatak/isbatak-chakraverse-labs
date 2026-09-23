import * as wheelPicker from "@isbatak/zag-wheel-picker"

export interface WheelPickerOption {
  label: string
  value: string
  disabled?: boolean
}

const frameworkItems: WheelPickerOption[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { disabled: true, label: "Angular (unavailable)", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
]

const controlledItems: WheelPickerOption[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" },
]

export const frameworkCollection = wheelPicker.collection({ items: frameworkItems })

export const controlledCollection = wheelPicker.collection({ items: controlledItems })

export const createNumberItems = (length: number, add = 0, locale = "en-US"): WheelPickerOption[] => {
  const formatter = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false })
  return Array.from({ length }, (_, index) => {
    const value = index + add
    return { label: formatter.format(value), value: value.toString() }
  })
}

export const hourCollection = wheelPicker.collection({ items: createNumberItems(12, 1) })

export const minuteCollection = wheelPicker.collection({ items: createNumberItems(60) })

export const meridiemCollection = wheelPicker.collection({
  items: [
    { label: "AM", value: "AM" },
    { label: "PM", value: "PM" },
  ],
})
