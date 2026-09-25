import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import { frameworkCollection, type WheelPickerControls } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"

const styles = wheelPickerRecipe()

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
      <div {...api.getRootProps()} className={styles.root}>
        <label {...api.getLabelProps()} className={styles.label}>
          Framework
        </label>

        <div {...api.getControlProps()} className={styles.control}>
          <div {...api.getViewportProps()} className={styles.viewport}>
            <ul {...api.getItemGroupProps()} className={styles.itemGroup}>
              {api.items.map(({ item, index, key }) => (
                <li key={key} {...api.getItemProps({ item, index })} className={styles.item}>
                  {item.label}
                </li>
              ))}
            </ul>

            <div {...api.getHighlightProps()} className={styles.highlight}>
              <ul {...api.getHighlightItemGroupProps()} className={styles.highlightItemGroup}>
                {api.highlightItems.map(({ item, index, key }) => (
                  <li key={key} {...api.getHighlightItemProps({ item, index })} className={styles.highlightItem}>
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
