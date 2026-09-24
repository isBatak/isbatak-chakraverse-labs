<script setup lang="ts">
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, useId } from "vue"
import "../../styles/wheel-picker.css"

const collection = wheelPicker.collection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular", disabled: true },
    { label: "Svelte", value: "svelte" },
    { label: "Solid", value: "solid" },
    { label: "Preact", value: "preact" },
    { label: "Qwik", value: "qwik" },
    { label: "Lit", value: "lit" },
  ],
})

const service = useMachine(wheelPicker.machine, {
  id: useId(),
  collection,
  defaultValue: "vue",
})

const api = computed(() => wheelPicker.connect(service, normalizeProps))
</script>

<template>
  <div v-bind="api.getRootProps()" class="wheel-picker">
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
      <option v-for="item in collection.items" :key="item.value" :value="item.value" :disabled="item.disabled">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>
