import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, spreadProps, VanillaMachine } from "@zag-js/vanilla"

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

const styles = wheelPickerRecipe()

export function createWheelPickerBasic(container: HTMLElement) {
  container.innerHTML = `
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
      <select data-el="hidden-select"></select>
    </div>
  `

  const el = (name: string) => container.querySelector(`[data-el="${name}"]`)!

  const machine = new VanillaMachine(wheelPicker.machine, {
    id: crypto.randomUUID(),
    collection,
    defaultValue: "lit",
  })

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

  el("hidden-select").replaceChildren(
    ...collection.items.map((item) => {
      const option = new Option(item.label, item.value)
      option.disabled = !!item.disabled
      return option
    }),
  )

  const render = () => {
    const api = wheelPicker.connect(machine.service, normalizeProps)
    spread(el("root"), api.getRootProps())
    spread(el("label"), api.getLabelProps())
    spread(el("control"), api.getControlProps())
    spread(el("viewport"), api.getViewportProps())
    spread(el("item-group"), api.getItemGroupProps())
    spread(el("highlight"), api.getHighlightProps())
    spread(el("highlight-item-group"), api.getHighlightItemGroupProps())
    spread(el("hidden-select"), api.getHiddenSelectProps())
    renderItems(el("item-group"), api.items, api.getItemProps, styles.item)
    renderItems(el("highlight-item-group"), api.highlightItems, api.getHighlightItemProps, styles.highlightItem)
  }

  machine.subscribe(render)
  machine.start()
  render()

  return () => {
    machine.stop()
    container.replaceChildren()
  }
}
