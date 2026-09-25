import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, Index } from "solid-js"

const collection = wheelPicker.collection({
  items: Array.from({ length: 60 }, (_, minute) => {
    const label = String(minute).padStart(2, "0")
    return { label, value: label }
  }),
})

const styles = wheelPickerRecipe()

export function WheelPickerInfinite() {
  const service = useMachine(wheelPicker.machine, {
    id: createUniqueId(),
    collection,
    defaultValue: "30",
    infinite: true,
  })

  const api = createMemo(() => wheelPicker.connect(service, normalizeProps))

  return (
    <div {...api().getRootProps()} class={styles.root}>
      <label {...api().getLabelProps()} class={styles.label}>
        Minute
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
  )
}
