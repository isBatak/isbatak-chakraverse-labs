"use client"

import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"
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
    id: useId(),
    collection,
    defaultValue: "react",
  })

  const api = wheelPicker.connect(service, normalizeProps)

  return (
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
      <select {...api.getHiddenSelectProps()}>
        {collection.items.map((item) => (
          <option key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}
