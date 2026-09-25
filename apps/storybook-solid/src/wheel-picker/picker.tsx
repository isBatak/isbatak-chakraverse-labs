import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { For, Index, Show, createMemo, createUniqueId } from "solid-js"

const styles = wheelPickerRecipe()

export interface PickerProps {
  label: string
  collection: wheelPicker.Props["collection"]
  value?: string
  defaultValue?: string
  infinite?: boolean
  name?: string
  onValueChange?: (details: wheelPicker.ValueChangeDetails) => void
  /** Render the hidden `<select>` used for native form submission. */
  hiddenSelect?: boolean
}

/**
 * One wheel picker column. Solid keeps one machine per component instance, so the multi-column examples render one
 * `Picker` per column instead of mapping over an array of services.
 */
export function Picker(props: PickerProps) {
  const id = createUniqueId()
  const service = useMachine(wheelPicker.machine, () => {
    const { label: _label, hiddenSelect: _hiddenSelect, ...machineProps } = props
    return { id, ...machineProps }
  })
  const api = createMemo(() => wheelPicker.connect(service, normalizeProps))

  return (
    <div {...api().getRootProps()} class={styles.root}>
      <label {...api().getLabelProps()} class={styles.label}>
        {props.label}
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
      <Show when={props.hiddenSelect}>
        <select {...api().getHiddenSelectProps()}>
          <For each={props.collection.items}>{(item) => <option value={item.value}>{item.label}</option>}</For>
        </select>
      </Show>
    </div>
  )
}
