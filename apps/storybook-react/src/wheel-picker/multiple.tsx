import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import { hourCollection, meridiemCollection, minuteCollection } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"

const styles = wheelPickerRecipe()

export function Multiple() {
  const id = useId()
  const hourService = useMachine(wheelPicker.machine, {
    id: `${id}:hour`,
    collection: hourCollection,
    defaultValue: "9",
    infinite: true,
    name: "hour",
  })
  const minuteService = useMachine(wheelPicker.machine, {
    id: `${id}:minute`,
    collection: minuteCollection,
    defaultValue: "41",
    infinite: true,
    name: "minute",
  })
  const meridiemService = useMachine(wheelPicker.machine, {
    id: `${id}:meridiem`,
    collection: meridiemCollection,
    defaultValue: "AM",
    name: "meridiem",
  })

  const hourApi = wheelPicker.connect(hourService, normalizeProps)
  const minuteApi = wheelPicker.connect(minuteService, normalizeProps)
  const meridiemApi = wheelPicker.connect(meridiemService, normalizeProps)
  const pickers = [
    { api: hourApi, collection: hourCollection, label: "Hour" },
    { api: minuteApi, collection: minuteCollection, label: "Minute" },
    { api: meridiemApi, collection: meridiemCollection, label: "Meridiem" },
  ]

  return (
    <main className="wheel-picker">
      <div className="wheel-picker-group" role="group" aria-label="Time">
        {pickers.map(({ api, collection, label }) => (
          <div key={label} {...api.getRootProps()} className={styles.root}>
            <label {...api.getLabelProps()} className={styles.label}>
              {label}
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
              {collection.items.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <output data-testid="value">
        Selected time: {hourApi.valueAsString}:{minuteApi.valueAsString} {meridiemApi.valueAsString}
      </output>
    </main>
  )
}
