<script setup lang="ts">
import { css } from "@isbatak/panda-ds/css"
import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, ref, useId } from "vue"

const collection = wheelPicker.collection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Solid", value: "solid" },
  ],
})

const styles = wheelPickerRecipe()

const classes = {
  root: css({ display: "grid", gap: "4" }),
  actions: css({ display: "flex", justifyContent: "center", gap: "2" }),
  button: css({
    px: "3",
    py: "1.5",
    borderWidth: "1px",
    borderRadius: "l2",
    textStyle: "sm",
    cursor: "pointer",
    _hover: { bg: "bg.muted" },
  }),
  output: css({ color: "fg.muted", textStyle: "sm", textAlign: "center" }),
}

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
  <div :class="classes.root">
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
    <div :class="classes.actions">
      <button type="button" :class="classes.button" @click="value = 'react'">React</button>
      <button type="button" :class="classes.button" @click="value = 'svelte'">Svelte</button>
    </div>
    <output :class="classes.output">Value: {{ value }}</output>
  </div>
</template>
