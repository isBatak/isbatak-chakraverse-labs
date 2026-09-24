<script setup lang="ts">
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, useId } from "vue"
import "../../styles/wheel-picker.css"

const collection = wheelPicker.collection({
  items: Array.from({ length: 60 }, (_, minute) => {
    const label = String(minute).padStart(2, "0")
    return { label, value: label }
  }),
})

const service = useMachine(wheelPicker.machine, {
  id: useId(),
  collection,
  defaultValue: "30",
  infinite: true,
})

const api = computed(() => wheelPicker.connect(service, normalizeProps))
</script>

<template>
  <div v-bind="api.getRootProps()" class="wheel-picker">
    <label v-bind="api.getLabelProps()">Minute</label>
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
</template>
