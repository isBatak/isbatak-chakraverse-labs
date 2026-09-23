import { hourCollection, meridiemCollection, minuteCollection } from "@isbatak/storybook-shared"
import type * as wheelPicker from "@isbatak/zag-wheel-picker"
import { createSignal } from "solid-js"
import { Picker } from "./picker"

const toLabel = (details: wheelPicker.ValueChangeDetails) => details.item?.label ?? ""

export function Multiple() {
  const [hour, setHour] = createSignal("09")
  const [minute, setMinute] = createSignal("41")
  const [meridiem, setMeridiem] = createSignal("AM")

  return (
    <main class="wheel-picker">
      <div class="wheel-picker-group" role="group" aria-label="Time">
        <Picker
          label="Hour"
          collection={hourCollection}
          defaultValue="9"
          infinite
          name="hour"
          hiddenSelect
          onValueChange={(details) => setHour(toLabel(details))}
        />
        <Picker
          label="Minute"
          collection={minuteCollection}
          defaultValue="41"
          infinite
          name="minute"
          hiddenSelect
          onValueChange={(details) => setMinute(toLabel(details))}
        />
        <Picker
          label="Meridiem"
          collection={meridiemCollection}
          defaultValue="AM"
          name="meridiem"
          hiddenSelect
          onValueChange={(details) => setMeridiem(toLabel(details))}
        />
      </div>
      <output data-testid="value">
        Selected time: {hour()}:{minute()} {meridiem()}
      </output>
    </main>
  )
}
