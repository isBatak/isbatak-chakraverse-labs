import { frameworkCollection, type WheelPickerControls } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { For, Index, createMemo, createUniqueId } from "solid-js"

export interface BasicProps extends Partial<WheelPickerControls> {
  onValueChange?: (details: wheelPicker.ValueChangeDetails) => void
}

export function Basic(props: BasicProps) {
  const id = createUniqueId()
  const service = useMachine(wheelPicker.machine, () => ({
    id,
    collection: frameworkCollection,
    defaultValue: "react",
    name: "framework",
    ...props,
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
        <select {...api().getHiddenSelectProps()}>
          <For each={frameworkCollection.items}>
            {(item) => (
              <option value={item.value} disabled={item.disabled}>
                {item.label}
              </option>
            )}
          </For>
        </select>
      </div>
      <output data-testid="value">Selected: {api().valueAsString}</output>
    </main>
  )
}
