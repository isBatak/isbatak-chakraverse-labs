<script lang="ts">
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
  import { normalizeProps, useMachine } from "@zag-js/svelte"

  const props: TimeInputControls = $props()
  const id = $props.id()
  let value = $state.raw<dateInput.DateValue[]>([])
  const hourCycle = $derived(getHourCycle(props.locale))
  const formatter = $derived(getTimeFormatter(props.locale))
  const hourCollection = $derived(getHourCollection(props.locale, hourCycle))
  const minuteCollection = $derived(getMinuteCollection(props.locale))
  const dayPeriodCollection = $derived(getDayPeriodCollection(props.locale))

  const dateInputService = useMachine(dateInput.machine, () => ({
    id: `${id}:input`,
    locale: props.locale,
    granularity: "minute" as const,
    formatter,
    shouldForceLeadingZeros: true,
    name: "time",
    value,
    onValueChange(details: dateInput.ValueChangeDetails) {
      value = details.value
    },
  }))
  const dateInputApi = $derived(dateInput.connect(dateInputService, normalizeProps))
  const time = $derived(getTimeParts(dateInputApi.value[0] ?? dateInputApi.placeholderValue, hourCycle))

  function updateTime<Part extends keyof TimeParts>(part: Part, partValue: TimeParts[Part]) {
    const nextTime = setTimePart(value[0] ?? dateInputApi.placeholderValue, hourCycle, part, partValue)
    if (nextTime) value = [nextTime]
  }

  const popoverService = useMachine(popover.machine, {
    id: `${id}:popover`,
    positioning: { placement: "bottom" },
    modal: true,
  })
  const hourService = useMachine(wheelPicker.machine, () => ({
    id: `${id}:hour`,
    collection: hourCollection,
    value: time.hour,
    infinite: true,
    onValueChange(details: wheelPicker.ValueChangeDetails) {
      if (details.value) updateTime("hour", details.value)
    },
  }))
  const minuteService = useMachine(wheelPicker.machine, () => ({
    id: `${id}:minute`,
    collection: minuteCollection,
    value: time.minute,
    infinite: true,
    onValueChange(details: wheelPicker.ValueChangeDetails) {
      if (details.value) updateTime("minute", details.value)
    },
  }))
  const dayPeriodService = useMachine(wheelPicker.machine, () => ({
    id: `${id}:day-period`,
    collection: dayPeriodCollection,
    value: time.dayPeriod,
    onValueChange(details: wheelPicker.ValueChangeDetails) {
      if (isDayPeriod(details.value)) updateTime("dayPeriod", details.value)
    },
  }))

  const popoverApi = $derived(popover.connect(popoverService, normalizeProps))
  const pickers = $derived([
    { api: wheelPicker.connect(hourService, normalizeProps), label: "Hour" },
    { api: wheelPicker.connect(minuteService, normalizeProps), label: "Minute" },
    ...(isTwelveHourCycle(hourCycle)
      ? [{ api: wheelPicker.connect(dayPeriodService, normalizeProps), label: "Day period" }]
      : []),
  ])
</script>

<main class="date-input wheel-picker wheel-picker-time-input">
  <div {...dateInputApi.getRootProps()}>
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label {...dateInputApi.getLabelProps()}>Time</label>
    <div class="wheel-picker-time-field" {...popoverApi.getAnchorProps()}>
      <div {...dateInputApi.getControlProps()}>
        <div {...dateInputApi.getSegmentGroupProps()}>
          {#each dateInputApi.getSegments() as segment, index (index)}
            <span {...dateInputApi.getSegmentProps({ segment })}>{segment.text}</span>
          {/each}
        </div>
      </div>
      <button aria-label="Open time picker" {...popoverApi.getTriggerProps()}>🕘</button>
    </div>
    <input {...dateInputApi.getHiddenInputProps()} />
  </div>

  <div {...popoverApi.getPositionerProps()}>
    <div class="wheel-picker-time-content" {...popoverApi.getContentProps()}>
      <div class="sr-only" {...popoverApi.getTitleProps()}>Select time</div>
      <div class="sr-only" {...popoverApi.getDescriptionProps()}>Choose an hour, minute, and day period.</div>
      <div class="wheel-picker-group" role="group" aria-label="Time picker">
        {#each pickers as { api, label } (label)}
          <div {...api.getRootProps()}>
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="sr-only" {...api.getLabelProps()}>{label}</label>
            <div {...api.getControlProps()}>
              <div {...api.getViewportProps()}>
                <ul {...api.getItemGroupProps()}>
                  {#each api.items as { item, index, key } (key)}
                    <li {...api.getItemProps({ item, index })}>{item.label}</li>
                  {/each}
                </ul>
                <div {...api.getHighlightProps()}>
                  <ul {...api.getHighlightItemGroupProps()}>
                    {#each api.highlightItems as { item, index, key } (key)}
                      <li {...api.getHighlightItemProps({ item, index })}>{item.label}</li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <output data-testid="value">Selected time: {dateInputApi.valueAsString[0] ?? "-"}</output>
</main>
