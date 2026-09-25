<script setup lang="ts">
import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import { controlledCollection } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, ref, useId } from "vue"

const styles = wheelPickerRecipe()

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
    <div v-bind="api.getRootProps()" :class="styles.root">
      <label v-bind="api.getLabelProps()" :class="styles.label">Framework</label>
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
    <div class="wheel-picker-actions">
      <button type="button" @click="value = 'react'">Select React</button>
      <button type="button" @click="value = 'svelte'">Select Svelte</button>
    </div>
    <output data-testid="value">Controlled value: {{ api.valueAsString }}</output>
  </main>
</template>
