import { css } from "@isbatak/panda-ds/css"
import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createSignal, createUniqueId, Index } from "solid-js"

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
  const id = createUniqueId()
  const [value, setValue] = createSignal<string | null>("react")

  const service = useMachine(wheelPicker.machine, () => ({
    id,
    collection,
    value: value(),
    onValueChange: (details: wheelPicker.ValueChangeDetails) => setValue(details.value),
  }))

  const api = createMemo(() => wheelPicker.connect(service, normalizeProps))

  return (
    <div class={classes.root}>
      <div {...api().getRootProps()} class={styles.root}>
        <label {...api().getLabelProps()} class={styles.label}>
          Framework
        </label>
        <div {...api().getControlProps()} class={styles.control}>
          <div {...api().getViewportProps()} class={styles.viewport}>
            <ul {...api().getItemGroupProps()} class={styles.itemGroup}>
              <Index each={api().items}>
                {(entry) => (
                  <li {...api().getItemProps(entry())} class={styles.item}>
                    {entry().item.label}
                  </li>
                )}
              </Index>
            </ul>
            <div {...api().getHighlightProps()} class={styles.highlight}>
              <ul {...api().getHighlightItemGroupProps()} class={styles.highlightItemGroup}>
                <Index each={api().highlightItems}>
                  {(entry) => (
                    <li {...api().getHighlightItemProps(entry())} class={styles.highlightItem}>
                      {entry().item.label}
                    </li>
                  )}
                </Index>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class={classes.actions}>
        <button type="button" class={classes.button} onClick={() => setValue("react")}>
          React
        </button>
        <button type="button" class={classes.button} onClick={() => setValue("svelte")}>
          Svelte
        </button>
      </div>
      <output class={classes.output}>Value: {value()}</output>
    </div>
  )
}
