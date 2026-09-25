<script setup lang="ts">
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
  type Locale,
  type TimeParts,
} from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import * as dateInput from "@zag-js/date-input"
import * as popover from "@zag-js/popover"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, shallowRef, useId } from "vue"

const styles = wheelPickerRecipe()

const props = defineProps<{ locale: Locale }>()

const id = useId()
const value = shallowRef<dateInput.DateValue[]>([])
const hourCycle = computed(() => getHourCycle(props.locale))
const formatter = computed(() => getTimeFormatter(props.locale))
const hourCollection = computed(() => getHourCollection(props.locale, hourCycle.value))
const minuteCollection = computed(() => getMinuteCollection(props.locale))
const dayPeriodCollection = computed(() => getDayPeriodCollection(props.locale))

const dateInputService = useMachine(
  dateInput.machine,
  computed(() => ({
    id: `${id}:input`,
    locale: props.locale,
    granularity: "minute" as const,
    formatter: formatter.value,
    shouldForceLeadingZeros: true,
    name: "time",
    value: value.value,
    onValueChange(details: dateInput.ValueChangeDetails) {
      value.value = details.value
    },
  })),
)
const dateInputApi = computed(() => dateInput.connect(dateInputService, normalizeProps))
const time = computed(() =>
  getTimeParts(dateInputApi.value.value[0] ?? dateInputApi.value.placeholderValue, hourCycle.value),
)

function updateTime<Part extends keyof TimeParts>(part: Part, partValue: TimeParts[Part]) {
  const current = value.value[0] ?? dateInputApi.value.placeholderValue
  const nextTime = setTimePart(current, hourCycle.value, part, partValue)
  if (nextTime) value.value = [nextTime]
}

const popoverService = useMachine(popover.machine, {
  id: `${id}:popover`,
  positioning: { placement: "bottom" },
  modal: true,
})
const hourService = useMachine(
  wheelPicker.machine,
  computed(() => ({
    id: `${id}:hour`,
    collection: hourCollection.value,
    value: time.value.hour,
    infinite: true,
    onValueChange(details: wheelPicker.ValueChangeDetails) {
      if (details.value) updateTime("hour", details.value)
    },
  })),
)
const minuteService = useMachine(
  wheelPicker.machine,
  computed(() => ({
    id: `${id}:minute`,
    collection: minuteCollection.value,
    value: time.value.minute,
    infinite: true,
    onValueChange(details: wheelPicker.ValueChangeDetails) {
      if (details.value) updateTime("minute", details.value)
    },
  })),
)
const dayPeriodService = useMachine(
  wheelPicker.machine,
  computed(() => ({
    id: `${id}:day-period`,
    collection: dayPeriodCollection.value,
    value: time.value.dayPeriod,
    onValueChange(details: wheelPicker.ValueChangeDetails) {
      if (isDayPeriod(details.value)) updateTime("dayPeriod", details.value)
    },
  })),
)

const popoverApi = computed(() => popover.connect(popoverService, normalizeProps))
const pickers = computed(() => [
  { api: wheelPicker.connect(hourService, normalizeProps), label: "Hour" },
  { api: wheelPicker.connect(minuteService, normalizeProps), label: "Minute" },
  ...(isTwelveHourCycle(hourCycle.value)
    ? [{ api: wheelPicker.connect(dayPeriodService, normalizeProps), label: "Day period" }]
    : []),
])
</script>

<template>
  <main class="date-input wheel-picker wheel-picker-time-input">
    <div v-bind="dateInputApi.getRootProps()">
      <label v-bind="dateInputApi.getLabelProps()">Time</label>
      <div class="wheel-picker-time-field" v-bind="popoverApi.getAnchorProps()">
        <div v-bind="dateInputApi.getControlProps()">
          <div v-bind="dateInputApi.getSegmentGroupProps()">
            <span
              v-for="(segment, index) in dateInputApi.getSegments()"
              :key="index"
              v-bind="dateInputApi.getSegmentProps({ segment })"
              >{{ segment.text }}</span
            >
          </div>
        </div>
        <button aria-label="Open time picker" v-bind="popoverApi.getTriggerProps()">🕘</button>
      </div>
      <input v-bind="dateInputApi.getHiddenInputProps()" />
    </div>

    <div v-bind="popoverApi.getPositionerProps()">
      <div class="wheel-picker-time-content" v-bind="popoverApi.getContentProps()">
        <div class="sr-only" v-bind="popoverApi.getTitleProps()">Select time</div>
        <div class="sr-only" v-bind="popoverApi.getDescriptionProps()">Choose an hour, minute, and day period.</div>
        <div class="wheel-picker-group" role="group" aria-label="Time picker">
          <div v-for="{ api, label } in pickers" :key="label" v-bind="api.getRootProps()" :class="styles.root">
            <label v-bind="api.getLabelProps()" :class="styles.label">{{ label }}</label>
            <div v-bind="api.getControlProps()" :class="styles.control">
              <div v-bind="api.getViewportProps()" :class="styles.viewport">
                <ul v-bind="api.getItemGroupProps()" :class="styles.itemGroup">
                  <li
                    v-for="{ item, index, key } in api.items"
                    :key="key"
                    v-bind="api.getItemProps({ item, index })"
                    :class="styles.item"
                  >
                    {{ item.label }}
                  </li>
                </ul>
                <div v-bind="api.getHighlightProps()" :class="styles.highlight">
                  <ul v-bind="api.getHighlightItemGroupProps()" :class="styles.highlightItemGroup">
                    <li
                      v-for="{ item, index, key } in api.highlightItems"
                      :key="key"
                      v-bind="api.getHighlightItemProps({ item, index })"
                      :class="styles.highlightItem"
                    >
                      {{ item.label }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <output data-testid="value">Selected time: {{ dateInputApi.valueAsString[0] ?? "-" }}</output>
  </main>
</template>
