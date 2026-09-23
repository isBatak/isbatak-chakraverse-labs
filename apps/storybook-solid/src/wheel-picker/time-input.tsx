import {
  getDayPeriodCollection,
  getHourCollection,
  getHourCycle,
  getMinuteCollection,
  getTimeFormatter,
  getTimeParts,
  isDayPeriod,
  isTwelveHourCycle,
  setTimePart,
  type TimeInputControls,
  type TimeParts,
} from "@isbatak/storybook-shared"
import * as dateInput from "@zag-js/date-input"
import * as popover from "@zag-js/popover"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { Index, Show, createMemo, createSignal, createUniqueId } from "solid-js"
import { Picker } from "./picker"

export function TimeInput(props: TimeInputControls) {
  const id = createUniqueId()
  const [value, setValue] = createSignal<dateInput.DateValue[]>([])
  const hourCycle = createMemo(() => getHourCycle(props.locale))
  const formatter = createMemo(() => getTimeFormatter(props.locale))
  const hourCollection = createMemo(() => getHourCollection(props.locale, hourCycle()))
  const minuteCollection = createMemo(() => getMinuteCollection(props.locale))
  const dayPeriodCollection = createMemo(() => getDayPeriodCollection(props.locale))

  const dateInputService = useMachine(dateInput.machine, () => ({
    id: `${id}:input`,
    locale: props.locale,
    granularity: "minute" as const,
    formatter: formatter(),
    shouldForceLeadingZeros: true,
    name: "time",
    value: value(),
    onValueChange: (details: dateInput.ValueChangeDetails) => setValue(details.value),
  }))
  const dateInputApi = createMemo(() => dateInput.connect(dateInputService, normalizeProps))
  const time = createMemo(() => getTimeParts(dateInputApi().value[0] ?? dateInputApi().placeholderValue, hourCycle()))

  const updateTime = <Part extends keyof TimeParts>(part: Part, partValue: TimeParts[Part]) => {
    const nextTime = setTimePart(value()[0] ?? dateInputApi().placeholderValue, hourCycle(), part, partValue)
    if (nextTime) setValue([nextTime])
  }

  const popoverService = useMachine(popover.machine, {
    id: `${id}:popover`,
    positioning: { placement: "bottom" },
    modal: true,
  })
  const popoverApi = createMemo(() => popover.connect(popoverService, normalizeProps))

  return (
    <main class="date-input wheel-picker wheel-picker-time-input">
      <div {...dateInputApi().getRootProps()}>
        <label {...dateInputApi().getLabelProps()}>Time</label>
        <div class="wheel-picker-time-field" {...popoverApi().getAnchorProps()}>
          <div {...dateInputApi().getControlProps()}>
            <div {...dateInputApi().getSegmentGroupProps()}>
              <Index each={dateInputApi().getSegments()}>
                {(segment) => <span {...dateInputApi().getSegmentProps({ segment: segment() })}>{segment().text}</span>}
              </Index>
            </div>
          </div>
          <button aria-label="Open time picker" {...popoverApi().getTriggerProps()}>
            🕘
          </button>
        </div>
        <input {...dateInputApi().getHiddenInputProps()} />
      </div>

      <div {...popoverApi().getPositionerProps()}>
        <div class="wheel-picker-time-content" {...popoverApi().getContentProps()}>
          <div class="sr-only" {...popoverApi().getTitleProps()}>
            Select time
          </div>
          <div class="sr-only" {...popoverApi().getDescriptionProps()}>
            Choose an hour, minute, and day period.
          </div>
          <div class="wheel-picker-group" role="group" aria-label="Time picker">
            <Picker
              label="Hour"
              collection={hourCollection()}
              value={time().hour}
              infinite
              onValueChange={(details) => {
                if (details.value) updateTime("hour", details.value)
              }}
            />
            <Picker
              label="Minute"
              collection={minuteCollection()}
              value={time().minute}
              infinite
              onValueChange={(details) => {
                if (details.value) updateTime("minute", details.value)
              }}
            />
            <Show when={isTwelveHourCycle(hourCycle())}>
              <Picker
                label="Day period"
                collection={dayPeriodCollection()}
                value={time().dayPeriod}
                onValueChange={(details) => {
                  if (isDayPeriod(details.value)) updateTime("dayPeriod", details.value)
                }}
              />
            </Show>
          </div>
        </div>
      </div>
      <output data-testid="value">Selected time: {dateInputApi().valueAsString[0] ?? "-"}</output>
    </main>
  )
}
