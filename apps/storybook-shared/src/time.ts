import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { DateFormatter } from "@internationalized/date"
import type { DateValue } from "@zag-js/date-input"
import { createNumberItems } from "./data"

export type ResolvedHourCycle = "h11" | "h12" | "h23" | "h24"

export type DayPeriod = "am" | "pm"

export interface TimeParts {
  hour: string
  minute: string
  dayPeriod: DayPeriod
}

/**
 * A time-only formatter for `@zag-js/date-input`. The published machine has no `maxGranularity` prop yet, and it derives
 * its segments from the formatter, so this limits the input to hour, minute and day period segments. The time zone
 * matches the machine's default (`UTC`).
 */
export const getTimeFormatter = (locale: string) =>
  new DateFormatter(locale, { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })

/** The hour cycle `@zag-js/date-input` picks for a locale when `hourCycle` is not set. */
export const getHourCycle = (locale: string): ResolvedHourCycle =>
  getTimeFormatter(locale).resolvedOptions().hourCycle ?? "h23"

export const isTwelveHourCycle = (hourCycle: ResolvedHourCycle) => hourCycle === "h11" || hourCycle === "h12"

export const isDayPeriod = (value: string | null | undefined): value is DayPeriod => value === "am" || value === "pm"

const getDayPeriodLabel = (locale: string, hour: number) =>
  new Intl.DateTimeFormat(locale, { hour: "numeric", hour12: true })
    .formatToParts(new Date(2020, 0, 1, hour))
    .find((part) => part.type === "dayPeriod")?.value ?? (hour < 12 ? "AM" : "PM")

const getHourConfig = (hourCycle: ResolvedHourCycle) => {
  switch (hourCycle) {
    case "h11":
      return { length: 12, add: 0 }
    case "h12":
      return { length: 12, add: 1 }
    case "h24":
      return { length: 24, add: 1 }
    default:
      return { length: 24, add: 0 }
  }
}

const getDisplayHour = (hour: number, hourCycle: ResolvedHourCycle) => {
  switch (hourCycle) {
    case "h11":
      return hour % 12
    case "h12":
      return hour % 12 || 12
    case "h24":
      return hour || 24
    default:
      return hour
  }
}

export function getTimeParts(value: DateValue | undefined, hourCycle: ResolvedHourCycle): TimeParts {
  const hour = value && "hour" in value ? value.hour : 0
  const minute = value && "minute" in value ? value.minute : 0

  return {
    hour: String(getDisplayHour(hour, hourCycle)),
    minute: String(minute),
    dayPeriod: hour >= 12 ? "pm" : "am",
  }
}

function get24Hour({ hour, dayPeriod }: TimeParts, hourCycle: ResolvedHourCycle) {
  const hourValue = Number(hour)
  if (hourCycle === "h23") return hourValue
  if (hourCycle === "h24") return hourValue % 24

  return (hourValue % 12) + (dayPeriod === "pm" ? 12 : 0)
}

/** Returns `current` with one time part replaced, or `undefined` when `current` has no time fields. */
export function setTimePart<Part extends keyof TimeParts>(
  current: DateValue,
  hourCycle: ResolvedHourCycle,
  part: Part,
  partValue: TimeParts[Part],
): DateValue | undefined {
  if (!("hour" in current)) return undefined

  const nextTime = { ...getTimeParts(current, hourCycle), [part]: partValue }
  return current.set({ hour: get24Hour(nextTime, hourCycle), minute: Number(nextTime.minute) })
}

export const getHourCollection = (locale: string, hourCycle: ResolvedHourCycle) => {
  const { length, add } = getHourConfig(hourCycle)
  return wheelPicker.collection({ items: createNumberItems(length, add, locale) })
}

export const getMinuteCollection = (locale: string) =>
  wheelPicker.collection({ items: createNumberItems(60, 0, locale) })

export const getDayPeriodCollection = (locale: string) =>
  wheelPicker.collection({
    items: [
      { label: getDayPeriodLabel(locale, 0), value: "am" },
      { label: getDayPeriodLabel(locale, 12), value: "pm" },
    ],
  })
