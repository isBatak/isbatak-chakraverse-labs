import { css } from "@isbatak/panda-ds/css"
import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/preact"
import { useId, useState } from "preact/hooks"

const collection = wheelPicker.collection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Solid", value: "solid" },
  ],
})

const styles = wheelPickerRecipe()

const classes = {
  root: css({ display: "grid", gap: "4" }),
  actions: css({ display: "flex", justifyContent: "center", gap: "2" }),
  button: css({
    px: "3",
    py: "1.5",
    borderWidth: "1px",
    borderRadius: "l2",
    textStyle: "sm",
    cursor: "pointer",
    _hover: { bg: "bg.muted" },
  }),
  output: css({ color: "fg.muted", textStyle: "sm", textAlign: "center" }),
}

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
    <div className={classes.root}>
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
      </div>
      <div className={classes.actions}>
        <button type="button" className={classes.button} onClick={() => setValue("react")}>
          React
        </button>
        <button type="button" className={classes.button} onClick={() => setValue("svelte")}>
          Svelte
        </button>
      </div>
      <output className={classes.output}>Value: {value}</output>
    </div>
  )
}
