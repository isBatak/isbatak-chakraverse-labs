"use client"

import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"

const collection = wheelPicker.collection({
  items: Array.from({ length: 60 }, (_, minute) => {
    const label = String(minute).padStart(2, "0")
    return { label, value: label }
  }),
})

const styles = wheelPickerRecipe()

export function WheelPickerInfinite() {
  const service = useMachine(wheelPicker.machine, {
    id: useId(),
    collection,
    defaultValue: "30",
    infinite: true,
  })

  const api = wheelPicker.connect(service, normalizeProps)

  return (
    <div {...api.getRootProps()} className={styles.root}>
      <label {...api.getLabelProps()} className={styles.label}>
        Minute
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
    </div>
  )
}
