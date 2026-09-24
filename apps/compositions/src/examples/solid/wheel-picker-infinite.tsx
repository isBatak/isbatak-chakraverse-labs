import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, Index } from "solid-js"
import "../../styles/wheel-picker.css"

const collection = wheelPicker.collection({
  items: Array.from({ length: 60 }, (_, minute) => {
    const label = String(minute).padStart(2, "0")
    return { label, value: label }
  }),
})

export function WheelPickerInfinite() {
  const service = useMachine(wheelPicker.machine, {
    id: createUniqueId(),
    collection,
    defaultValue: "30",
    infinite: true,
  })

  const api = createMemo(() => wheelPicker.connect(service, normalizeProps))

  return (
    <div {...api().getRootProps()} class="wheel-picker">
      <label {...api().getLabelProps()}>Minute</label>
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
  )
}
