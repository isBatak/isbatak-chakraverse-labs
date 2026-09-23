import { controlledCollection } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId, useState } from "react"

export function Controlled() {
  const [value, setValue] = useState("react")

  const service = useMachine(wheelPicker.machine, {
    id: useId(),
    collection: controlledCollection,
    value,
    onValueChange(details) {
      setValue(details.value ?? "react")
    },
  })

  const api = wheelPicker.connect(service, normalizeProps)

  return (
    <main className="wheel-picker">
      <div {...api.getRootProps()}>
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
          Select React
        </button>
        <button type="button" onClick={() => setValue("svelte")}>
          Select Svelte
        </button>
      </div>

      <output data-testid="value">Controlled value: {api.valueAsString}</output>
    </main>
  )
}
