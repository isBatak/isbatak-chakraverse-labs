import { frameworkCollection, type WheelPickerControls } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/preact"
import { useId } from "preact/hooks"

export interface BasicProps extends Partial<WheelPickerControls> {
  onValueChange?: (details: wheelPicker.ValueChangeDetails) => void
}

export function Basic(props: BasicProps) {
  const service = useMachine(wheelPicker.machine, {
    id: useId(),
    collection: frameworkCollection,
    defaultValue: "react",
    name: "framework",
    ...props,
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

        <select {...api.getHiddenSelectProps()}>
          {frameworkCollection.items.map((item) => (
            <option key={item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <output data-testid="value">Selected: {api.valueAsString}</output>
    </main>
  )
}
