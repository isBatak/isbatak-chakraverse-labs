<script setup lang="ts">
import { hourCollection, meridiemCollection, minuteCollection } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, useId } from "vue"

const id = useId()
const hourService = useMachine(wheelPicker.machine, {
  id: `${id}:hour`,
  collection: hourCollection,
  defaultValue: "9",
  infinite: true,
  name: "hour",
})
const minuteService = useMachine(wheelPicker.machine, {
  id: `${id}:minute`,
  collection: minuteCollection,
  defaultValue: "41",
  infinite: true,
  name: "minute",
})
const meridiemService = useMachine(wheelPicker.machine, {
  id: `${id}:meridiem`,
  collection: meridiemCollection,
  defaultValue: "AM",
  name: "meridiem",
})

const hourApi = computed(() => wheelPicker.connect(hourService, normalizeProps))
const minuteApi = computed(() => wheelPicker.connect(minuteService, normalizeProps))
const meridiemApi = computed(() => wheelPicker.connect(meridiemService, normalizeProps))
const pickers = computed(() => [
  { api: hourApi.value, collection: hourCollection, label: "Hour" },
  { api: minuteApi.value, collection: minuteCollection, label: "Minute" },
  { api: meridiemApi.value, collection: meridiemCollection, label: "Meridiem" },
])
</script>

<template>
  <main class="wheel-picker">
    <div class="wheel-picker-group" role="group" aria-label="Time">
      <div v-for="{ api, collection, label } in pickers" :key="label" v-bind="api.getRootProps()">
        <label class="sr-only" v-bind="api.getLabelProps()">{{ label }}</label>
        <div v-bind="api.getControlProps()">
          <div v-bind="api.getViewportProps()">
            <ul v-bind="api.getItemGroupProps()">
              <li v-for="{ item, index, key } in api.items" :key="key" v-bind="api.getItemProps({ item, index })">
                {{ item.label }}
              </li>
            </ul>
            <div v-bind="api.getHighlightProps()">
              <ul v-bind="api.getHighlightItemGroupProps()">
                <li
                  v-for="{ item, index, key } in api.highlightItems"
                  :key="key"
                  v-bind="api.getHighlightItemProps({ item, index })"
                >
                  {{ item.label }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <select v-bind="api.getHiddenSelectProps()">
          <option v-for="item in collection.items" :key="item.value" :value="item.value">{{ item.label }}</option>
        </select>
      </div>
    </div>
    <output data-testid="value">
      Selected time: {{ hourApi.valueAsString }}:{{ minuteApi.valueAsString }} {{ meridiemApi.valueAsString }}
    </output>
  </main>
</template>
