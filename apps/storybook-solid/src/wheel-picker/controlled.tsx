import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import { controlledCollection } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { Index, createMemo, createSignal, createUniqueId } from "solid-js"

const styles = wheelPickerRecipe()

export function Controlled() {
  const id = createUniqueId()
  const [value, setValue] = createSignal("react")
  const service = useMachine(wheelPicker.machine, () => ({
    id,
    collection: controlledCollection,
    value: value(),
    onValueChange: (details: wheelPicker.ValueChangeDetails) => setValue(details.value ?? "react"),
  }))
  const api = createMemo(() => wheelPicker.connect(service, normalizeProps))

  return (
    <main class="wheel-picker">
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
      </div>
      <div class="wheel-picker-actions">
        <button type="button" onClick={() => setValue("react")}>
          Select React
        </button>
        <button type="button" onClick={() => setValue("svelte")}>
          Select Svelte
        </button>
      </div>
      <output data-testid="value">Controlled value: {api().valueAsString}</output>
    </main>
  )
}
