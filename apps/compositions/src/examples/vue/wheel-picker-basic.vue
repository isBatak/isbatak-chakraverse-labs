<script setup lang="ts">
import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, useId } from "vue"

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

const styles = wheelPickerRecipe()

const service = useMachine(wheelPicker.machine, {
  id: useId(),
  collection,
  defaultValue: "react",
})

const api = computed(() => wheelPicker.connect(service, normalizeProps))
</script>

<template>
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
    <select v-bind="api.getHiddenSelectProps()">
      <option v-for="item in collection.items" :key="item.value" :value="item.value" :disabled="item.disabled">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>
