import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
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
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import * as dateInput from "@zag-js/date-input"
import * as popover from "@zag-js/popover"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId, useMemo, useState } from "react"

const styles = wheelPickerRecipe()

export function TimeInput({ locale }: TimeInputControls) {
  const id = useId()
  const [value, setValue] = useState<dateInput.DateValue[]>([])
  const formatter = useMemo(() => getTimeFormatter(locale), [locale])
  const dateInputService = useMachine(dateInput.machine, {
    id: `${id}:input`,
    locale,
    granularity: "minute",
    formatter,
    shouldForceLeadingZeros: true,
    name: "time",
    value,
    onValueChange(details) {
      setValue(details.value)
    },
  })
  const dateInputApi = dateInput.connect(dateInputService, normalizeProps)
  const hourCycle = useMemo(() => getHourCycle(locale), [locale])
  const hourCollection = useMemo(() => getHourCollection(locale, hourCycle), [locale, hourCycle])
  const minuteCollection = useMemo(() => getMinuteCollection(locale), [locale])
  const dayPeriodCollection = useMemo(() => getDayPeriodCollection(locale), [locale])
  const time = getTimeParts(dateInputApi.value[0] ?? dateInputApi.placeholderValue, hourCycle)

  const updateTime = <Part extends keyof TimeParts>(part: Part, partValue: TimeParts[Part]) => {
    setValue((currentValue) => {
      const nextTime = setTimePart(currentValue[0] ?? dateInputApi.placeholderValue, hourCycle, part, partValue)
      return nextTime ? [nextTime] : currentValue
    })
  }

  const popoverService = useMachine(popover.machine, {
    id: `${id}:popover`,
    positioning: { placement: "bottom" },
    modal: true,
  })
  const hourService = useMachine(wheelPicker.machine, {
    id: `${id}:hour`,
    collection: hourCollection,
    value: time.hour,
    infinite: true,
    onValueChange(details) {
      if (details.value) updateTime("hour", details.value)
    },
  })
  const minuteService = useMachine(wheelPicker.machine, {
    id: `${id}:minute`,
    collection: minuteCollection,
    value: time.minute,
    infinite: true,
    onValueChange(details) {
      if (details.value) updateTime("minute", details.value)
    },
  })
  const dayPeriodService = useMachine(wheelPicker.machine, {
    id: `${id}:day-period`,
    collection: dayPeriodCollection,
    value: time.dayPeriod,
    onValueChange(details) {
      if (isDayPeriod(details.value)) updateTime("dayPeriod", details.value)
    },
  })

  const popoverApi = popover.connect(popoverService, normalizeProps)
  const hourApi = wheelPicker.connect(hourService, normalizeProps)
  const minuteApi = wheelPicker.connect(minuteService, normalizeProps)
  const dayPeriodApi = wheelPicker.connect(dayPeriodService, normalizeProps)
  const pickers = [
    { api: hourApi, label: "Hour" },
    { api: minuteApi, label: "Minute" },
    ...(isTwelveHourCycle(hourCycle) ? [{ api: dayPeriodApi, label: "Day period" }] : []),
  ]

  return (
    <main className="date-input wheel-picker wheel-picker-time-input">
      <div {...dateInputApi.getRootProps()}>
        <label {...dateInputApi.getLabelProps()}>Time</label>
        <div {...popoverApi.getAnchorProps()} className="wheel-picker-time-field">
          <div {...dateInputApi.getControlProps()}>
            <div {...dateInputApi.getSegmentGroupProps()}>
              {dateInputApi.getSegments().map((segment, index) => (
                <span key={index} {...dateInputApi.getSegmentProps({ segment })}>
                  {segment.text}
                </span>
              ))}
            </div>
          </div>
          <button {...popoverApi.getTriggerProps()} aria-label="Open time picker">
            🕘
          </button>
        </div>
        <input {...dateInputApi.getHiddenInputProps()} />
      </div>

      <div {...popoverApi.getPositionerProps()}>
        <div className="wheel-picker-time-content" {...popoverApi.getContentProps()}>
          <div className="sr-only" {...popoverApi.getTitleProps()}>
            Select time
          </div>
          <div className="sr-only" {...popoverApi.getDescriptionProps()}>
            Choose an hour, minute, and day period.
          </div>

          <div className="wheel-picker-group" role="group" aria-label="Time picker">
            {pickers.map(({ api, label }) => (
              <div key={label} {...api.getRootProps()} className={styles.root}>
                <label {...api.getLabelProps()} className={styles.label}>
                  {label}
                </label>
                <div {...api.getControlProps()} className={styles.control}>
                  <div {...api.getViewportProps()} className={styles.viewport}>
                    <ul {...api.getItemGroupProps()} className={styles.itemGroup}>
                      {api.items.map(({ item, index, key }) => (
                        <li key={key} {...api.getItemProps({ item, index })} className={styles.item}>
                          {item.label}
                        </li>
                      ))}
                    </ul>

                    <div {...api.getHighlightProps()} className={styles.highlight}>
                      <ul {...api.getHighlightItemGroupProps()} className={styles.highlightItemGroup}>
                        {api.highlightItems.map(({ item, index, key }) => (
                          <li
                            key={key}
                            {...api.getHighlightItemProps({ item, index })}
                            className={styles.highlightItem}
                          >
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <output data-testid="value">Selected time: {dateInputApi.valueAsString[0] ?? "-"}</output>
    </main>
  )
}
