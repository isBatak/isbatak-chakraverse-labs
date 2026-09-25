import { css } from "@isbatak/panda-ds/css"
import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, spreadProps, VanillaMachine } from "@zag-js/vanilla"

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

export function createWheelPickerControlled(container: HTMLElement) {
  container.innerHTML = `
    <div class="${classes.root}">
      <div data-el="root" class="${styles.root}">
        <label data-el="label" class="${styles.label}">Framework</label>
        <div data-el="control" class="${styles.control}">
          <div data-el="viewport" class="${styles.viewport}">
            <ul data-el="item-group" class="${styles.itemGroup}"></ul>
            <div data-el="highlight" class="${styles.highlight}">
              <ul data-el="highlight-item-group" class="${styles.highlightItemGroup}"></ul>
            </div>
          </div>
        </div>
      </div>
      <div class="${classes.actions}">
        <button type="button" class="${classes.button}" data-value="react">React</button>
        <button type="button" class="${classes.button}" data-value="svelte">Svelte</button>
      </div>
      <output data-el="output" class="${classes.output}"></output>
    </div>
  `

  const el = (name: string) => container.querySelector(`[data-el="${name}"]`)!

  let value: string | null = "react"

  const machine = new VanillaMachine(wheelPicker.machine, {
    id: crypto.randomUUID(),
    collection,
    value,
    onValueChange: (details) => setValue(details.value),
  })

  function setValue(next: string | null) {
    value = next
    machine.updateProps({ value })
  }

  const spread = (node: Element, props: object) => spreadProps(node, props, machine.scope.id)

  const renderItems = (
    group: Element,
    entries: wheelPicker.Api["items"],
    getProps: (props: wheelPicker.ItemProps) => object,
    className = "",
  ) => {
    group.replaceChildren(
      ...entries.map(({ item, index }) => {
        const li = document.createElement("li")
        li.className = className
        li.textContent = item.label
        spread(li, getProps({ item, index }))
        return li
      }),
    )
  }

  container.querySelectorAll<HTMLButtonElement>("[data-value]").forEach((button) => {
    button.addEventListener("click", () => setValue(button.dataset.value!))
  })

  const render = () => {
    const api = wheelPicker.connect(machine.service, normalizeProps)
    spread(el("root"), api.getRootProps())
    spread(el("label"), api.getLabelProps())
    spread(el("control"), api.getControlProps())
    spread(el("viewport"), api.getViewportProps())
    spread(el("item-group"), api.getItemGroupProps())
    spread(el("highlight"), api.getHighlightProps())
    spread(el("highlight-item-group"), api.getHighlightItemGroupProps())
    renderItems(el("item-group"), api.items, api.getItemProps, styles.item)
    renderItems(el("highlight-item-group"), api.highlightItems, api.getHighlightItemProps, styles.highlightItem)
    el("output").textContent = `Value: ${value}`
  }

  machine.subscribe(render)
  machine.start()
  render()

  return () => {
    machine.stop()
    container.replaceChildren()
  }
}
