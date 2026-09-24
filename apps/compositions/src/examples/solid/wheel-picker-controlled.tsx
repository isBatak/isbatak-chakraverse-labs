import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createSignal, createUniqueId, Index } from "solid-js"
import "../../styles/wheel-picker.css"

const collection = wheelPicker.collection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Solid", value: "solid" },
  ],
})

export function WheelPickerControlled() {
  const id = createUniqueId()
  const [value, setValue] = createSignal<string | null>("react")

  const service = useMachine(wheelPicker.machine, () => ({
    id,
    collection,
    value: value(),
    onValueChange: (details: wheelPicker.ValueChangeDetails) => setValue(details.value),
  }))

  const api = createMemo(() => wheelPicker.connect(service, normalizeProps))

  return (
    <div class="wheel-picker-example">
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
      </div>
      <div class="wheel-picker-actions">
        <button type="button" onClick={() => setValue("react")}>
          React
        </button>
        <button type="button" onClick={() => setValue("svelte")}>
          Svelte
        </button>
      </div>
      <output>Value: {value()}</output>
    </div>
  )
}
