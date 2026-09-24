"use client"

import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"
import { styled } from "styled-system/jsx"
import { wheelPicker as wheelPickerRecipe } from "styled-system/recipes"

const collection = wheelPicker.collection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
    { label: "Solid", value: "solid" },
    { label: "Preact", value: "preact" },
    { label: "Qwik", value: "qwik" },
    { label: "Lit", value: "lit" },
    { label: "Angular", value: "angular", disabled: true },
  ],
})

export function WheelPickerPreview() {
  const service = useMachine(wheelPicker.machine, {
    id: useId(),
    collection,
    defaultValue: "svelte",
  })
  const api = wheelPicker.connect(service, normalizeProps)
  const styles = wheelPickerRecipe()

  return (
    <styled.div display="grid" justifyItems="center" gap="6">
      <div {...api.getRootProps()} className={styles.root}>
        <label {...api.getLabelProps()} className={styles.label}>
          Framework
        </label>
        <div {...api.getControlProps()} className={styles.control}>
          <div {...api.getViewportProps()} className={styles.viewport}>
            <ul {...api.getItemGroupProps()} className={styles.itemGroup}>
              {api.items.map(({ item, index, key }) => (
                <li key={key} {...api.getItemProps({ item, index })} className={styles.item}>
                  {item.label}
                </li>
              ))}
            </ul>
            <div {...api.getHighlightProps()} className={styles.highlight}>
              <ul {...api.getHighlightItemGroupProps()} className={styles.highlightItemGroup}>
                {api.highlightItems.map(({ item, index, key }) => (
                  <li key={key} {...api.getHighlightItemProps({ item, index })} className={styles.highlightItem}>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <select {...api.getHiddenSelectProps()}>
          {collection.items.map((item) => (
            <option key={item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <styled.output textStyle="sm" color="fg.muted">
        {api.valueAsString}
      </styled.output>
    </styled.div>
  )
}
