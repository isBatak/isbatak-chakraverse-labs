import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, spreadProps, VanillaMachine } from "@zag-js/vanilla"
import "../../styles/wheel-picker.css"

const collection = wheelPicker.collection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Solid", value: "solid" },
  ],
})

export function createWheelPickerControlled(container: HTMLElement) {
  container.innerHTML = `
    <div class="wheel-picker-example">
      <div data-el="root" class="wheel-picker">
        <label data-el="label">Framework</label>
        <div data-el="control">
          <div data-el="viewport">
            <ul data-el="item-group"></ul>
            <div data-el="highlight"><ul data-el="highlight-item-group"></ul></div>
          </div>
        </div>
      </div>
      <div class="wheel-picker-actions">
        <button type="button" data-value="react">React</button>
        <button type="button" data-value="svelte">Svelte</button>
      </div>
      <output data-el="output"></output>
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
    renderItems(el("item-group"), api.items, api.getItemProps)
    renderItems(el("highlight-item-group"), api.highlightItems, api.getHighlightItemProps)
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
