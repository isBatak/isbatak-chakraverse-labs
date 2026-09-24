import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/preact"
import { useId } from "preact/hooks"
import "../../styles/wheel-picker.css"

const collection = wheelPicker.collection({
  items: Array.from({ length: 60 }, (_, minute) => {
    const label = String(minute).padStart(2, "0")
    return { label, value: label }
  }),
})

export function WheelPickerInfinite() {
  const service = useMachine(wheelPicker.machine, {
    id: useId(),
    collection,
    defaultValue: "30",
    infinite: true,
  })

  const api = wheelPicker.connect(service, normalizeProps)

  return (
    <div {...api.getRootProps()} className="wheel-picker">
      <label {...api.getLabelProps()}>Minute</label>
      <div {...api.getControlProps()}>
        <div {...api.getViewportProps()}>
          <ul {...api.getItemGroupProps()}>
            {api.items.map(({ item, index, key }) => (
              <li key={key} {...api.getItemProps({ item, index })}>
                {item.label}
              </li>
            ))}
          </ul>
          <div {...api.getHighlightProps()}>
            <ul {...api.getHighlightItemGroupProps()}>
              {api.highlightItems.map(({ item, index, key }) => (
                <li key={key} {...api.getHighlightItemProps({ item, index })}>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
