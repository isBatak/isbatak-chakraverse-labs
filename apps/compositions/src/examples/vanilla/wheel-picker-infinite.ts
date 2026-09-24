import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, spreadProps, VanillaMachine } from "@zag-js/vanilla"
import "../../styles/wheel-picker.css"

const collection = wheelPicker.collection({
  items: Array.from({ length: 60 }, (_, minute) => {
    const label = String(minute).padStart(2, "0")
    return { label, value: label }
  }),
})

export function createWheelPickerInfinite(container: HTMLElement) {
  container.innerHTML = `
    <div data-el="root" class="wheel-picker">
      <label data-el="label">Minute</label>
      <div data-el="control">
        <div data-el="viewport">
          <ul data-el="item-group"></ul>
          <div data-el="highlight"><ul data-el="highlight-item-group"></ul></div>
        </div>
      </div>
    </div>
  `

  const el = (name: string) => container.querySelector(`[data-el="${name}"]`)!

  const machine = new VanillaMachine(wheelPicker.machine, {
    id: crypto.randomUUID(),
    collection,
    defaultValue: "30",
    infinite: true,
  })

  const spread = (node: Element, props: object) => spreadProps(node, props, machine.scope.id)

  const renderItems = (
    group: Element,
    entries: wheelPicker.Api["items"],
    getProps: (props: wheelPicker.ItemProps) => object,
  ) => {
    group.replaceChildren(
      ...entries.map(({ item, index }) => {
        const li = document.createElement("li")
        li.textContent = item.label
        spread(li, getProps({ item, index }))
        return li
      }),
    )
  }

  const render = () => {
    const api = wheelPicker.connect(machine.service, normalizeProps)
    spread(el("root"), api.getRootProps())
    spread(el("label"), api.getLabelProps())
    spread(el("control"), api.getControlProps())
    spread(el("viewport"), api.getViewportProps())
    spread(el("item-group"), api.getItemGroupProps())
    spread(el("highlight"), api.getHighlightProps())
    spread(el("highlight-item-group"), api.getHighlightItemGroupProps())
    renderItems(el("item-group"), api.items, api.getItemProps)
    renderItems(el("highlight-item-group"), api.highlightItems, api.getHighlightItemProps)
  }

  machine.subscribe(render)
  machine.start()
  render()

  return () => {
    machine.stop()
    container.replaceChildren()
  }
}
