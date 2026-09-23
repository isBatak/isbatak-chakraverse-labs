import { controlledCollection } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { Index, createMemo, createSignal, createUniqueId } from "solid-js"

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
      <div {...api().getRootProps()}>
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
