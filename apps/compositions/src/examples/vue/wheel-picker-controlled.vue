<script setup lang="ts">
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, ref, useId } from "vue"
import "../../styles/wheel-picker.css"

const collection = wheelPicker.collection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Solid", value: "solid" },
  ],
})

const id = useId()
const value = ref<string | null>("react")

const service = useMachine(
  wheelPicker.machine,
  computed(() => ({
    id,
    collection,
    value: value.value,
    onValueChange: (details: wheelPicker.ValueChangeDetails) => (value.value = details.value),
  })),
)

const api = computed(() => wheelPicker.connect(service, normalizeProps))
</script>

<template>
  <div class="wheel-picker-example">
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
    </div>
    <div class="wheel-picker-actions">
      <button type="button" @click="value = 'react'">React</button>
      <button type="button" @click="value = 'svelte'">Svelte</button>
    </div>
    <output>Value: {{ value }}</output>
  </div>
</template>
