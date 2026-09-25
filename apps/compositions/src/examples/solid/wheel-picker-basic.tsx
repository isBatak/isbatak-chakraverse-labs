import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, For, Index } from "solid-js"

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
    id: createUniqueId(),
    collection,
    defaultValue: "react",
  })

  const api = createMemo(() => wheelPicker.connect(service, normalizeProps))

  return (
    <div {...api().getRootProps()} class={styles.root}>
      <label {...api().getLabelProps()} class={styles.label}>
        Framework
      </label>
      <div {...api().getControlProps()} class={styles.control}>
        <div {...api().getViewportProps()} class={styles.viewport}>
          <ul {...api().getItemGroupProps()} class={styles.itemGroup}>
            <Index each={api().items}>
              {(entry) => (
                <li {...api().getItemProps(entry())} class={styles.item}>
                  {entry().item.label}
                </li>
              )}
            </Index>
          </ul>
          <div {...api().getHighlightProps()} class={styles.highlight}>
            <ul {...api().getHighlightItemGroupProps()} class={styles.highlightItemGroup}>
              <Index each={api().highlightItems}>
                {(entry) => (
                  <li {...api().getHighlightItemProps(entry())} class={styles.highlightItem}>
                    {entry().item.label}
                  </li>
                )}
              </Index>
            </ul>
          </div>
        </div>
      </div>
      <select {...api().getHiddenSelectProps()}>
        <For each={collection.items}>
          {(item) => (
            <option value={item.value} disabled={item.disabled}>
              {item.label}
            </option>
          )}
        </For>
      </select>
    </div>
  )
}
