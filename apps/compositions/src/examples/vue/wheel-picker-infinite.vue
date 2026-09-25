<script setup lang="ts">
import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, useId } from "vue"

const collection = wheelPicker.collection({
  items: Array.from({ length: 60 }, (_, minute) => {
    const label = String(minute).padStart(2, "0")
    return { label, value: label }
  }),
})

const styles = wheelPickerRecipe()

const service = useMachine(wheelPicker.machine, {
  id: useId(),
  collection,
  defaultValue: "30",
  infinite: true,
})

const api = computed(() => wheelPicker.connect(service, normalizeProps))
</script>

<template>
  <div v-bind="api.getRootProps()" :class="styles.root">
    <label v-bind="api.getLabelProps()" :class="styles.label">Minute</label>
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
</template>
