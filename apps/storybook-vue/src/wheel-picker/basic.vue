<script setup lang="ts">
import { frameworkCollection, wheelPickerArgs } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, useId } from "vue"

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    readOnly?: boolean
    invalid?: boolean
    infinite?: boolean
    dir?: "ltr" | "rtl"
    visibleCount?: number
    optionItemHeight?: number
    dragSensitivity?: number
    scrollSensitivity?: number
    onValueChange?: (details: wheelPicker.ValueChangeDetails) => void
  }>(),
  wheelPickerArgs,
)

const id = useId()
const service = useMachine(
  wheelPicker.machine,
  computed(() => ({
    id,
    collection: frameworkCollection,
    defaultValue: "react",
    name: "framework",
    ...props,
  })),
)
const api = computed(() => wheelPicker.connect(service, normalizeProps))
</script>

<template>
  <main class="wheel-picker">
    <div v-bind="api.getRootProps()">
      <label v-bind="api.getLabelProps()">Framework</label>
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
        <option
          v-for="item in frameworkCollection.items"
          :key="item.value"
          :value="item.value"
          :disabled="item.disabled"
        >
          {{ item.label }}
        </option>
      </select>
    </div>
    <output data-testid="value">Selected: {{ api.valueAsString }}</output>
  </main>
</template>
