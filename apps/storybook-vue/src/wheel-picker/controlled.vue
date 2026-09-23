<script setup lang="ts">
import { controlledCollection } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, ref, useId } from "vue"

const value = ref("react")
const service = useMachine(wheelPicker.machine, {
  id: useId(),
  collection: controlledCollection,
  get value() {
    return value.value
  },
  onValueChange: (details) => (value.value = details.value ?? "react"),
})
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
    </div>
    <div class="wheel-picker-actions">
      <button type="button" @click="value = 'react'">Select React</button>
      <button type="button" @click="value = 'svelte'">Select Svelte</button>
    </div>
    <output data-testid="value">Controlled value: {{ api.valueAsString }}</output>
  </main>
</template>
