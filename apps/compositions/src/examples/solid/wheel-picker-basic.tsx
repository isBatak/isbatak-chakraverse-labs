import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, For, Index } from "solid-js"
import "../../styles/wheel-picker.css"

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

export function WheelPickerBasic() {
  const service = useMachine(wheelPicker.machine, {
    id: createUniqueId(),
    collection,
    defaultValue: "solid",
  })

  const api = createMemo(() => wheelPicker.connect(service, normalizeProps))

  return (
    <div {...api().getRootProps()} class="wheel-picker">
      <label {...api().getLabelProps()}>Framework</label>
      <div {...api().getControlProps()}>
        <div {...api().getViewportProps()}>
          <ul {...api().getItemGroupProps()}>
            <Index each={api().items}>
              {(entry) => <li {...api().getItemProps(entry())}>{entry().item.label}</li>}
            </Index>
          </ul>
          <div {...api().getHighlightProps()}>
            <ul {...api().getHighlightItemGroupProps()}>
              <Index each={api().highlightItems}>
                {(entry) => <li {...api().getHighlightItemProps(entry())}>{entry().item.label}</li>}
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
