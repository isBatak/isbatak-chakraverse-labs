import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/preact"
import { useId } from "preact/hooks"

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

export function WheelPickerBasic() {
  const service = useMachine(wheelPicker.machine, {
    id: useId(),
    collection,
    defaultValue: "preact",
  })

  const api = wheelPicker.connect(service, normalizeProps)

  return (
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
  )
}
