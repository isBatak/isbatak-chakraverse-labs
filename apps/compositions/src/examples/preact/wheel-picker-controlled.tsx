import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/preact"
import { useId, useState } from "preact/hooks"
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
  const [value, setValue] = useState<string | null>("react")

  const service = useMachine(wheelPicker.machine, {
    id: useId(),
    collection,
    value,
    onValueChange: (details) => setValue(details.value),
  })

  const api = wheelPicker.connect(service, normalizeProps)

  return (
    <div className="wheel-picker-example">
      <div {...api.getRootProps()} className="wheel-picker">
        <label {...api.getLabelProps()}>Framework</label>
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
      <div className="wheel-picker-actions">
        <button type="button" onClick={() => setValue("react")}>
          React
        </button>
        <button type="button" onClick={() => setValue("svelte")}>
          Svelte
        </button>
      </div>
      <output>Value: {value}</output>
    </div>
  )
}
