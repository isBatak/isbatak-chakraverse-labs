import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import { controlledCollection } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, spreadProps, VanillaMachine } from "@zag-js/vanilla"
import { createElement, mount } from "../mount"

const styles = wheelPickerRecipe()

export function createControlled() {
  const main = createElement(`
    <main class="wheel-picker">
      <div class="wheel-picker-root ${styles.root}">
        <label class="wheel-picker-label ${styles.label}">Framework</label>
        <div class="wheel-picker-control ${styles.control}">
          <div class="wheel-picker-viewport ${styles.viewport}">
            <ul class="wheel-picker-items ${styles.itemGroup}"></ul>
            <div class="wheel-picker-highlight ${styles.highlight}">
              <ul class="wheel-picker-highlight-items ${styles.highlightItemGroup}"></ul>
            </div>
          </div>
        </div>
      </div>
      <div class="wheel-picker-actions">
        <button type="button" data-value="react">Select React</button>
        <button type="button" data-value="svelte">Select Svelte</button>
      </div>
      <output class="wheel-picker-output"></output>
    </main>
  `)
  let value = "react"
  const root = main.querySelector<HTMLElement>(".wheel-picker-root")!
  const machine = new VanillaMachine(wheelPicker.machine, {
    id: crypto.randomUUID(),
    collection: controlledCollection,
    value,
    onValueChange: (details) => {
      value = details.value ?? "react"
      machine.updateProps({ value })
    },
  })
  function render() {
    const api = wheelPicker.connect(machine.service, normalizeProps)
    const set = (selector: string, props: any) => {
      const element = root.querySelector(selector)
      if (element) spreadProps(element, props, machine.scope.id)
    }
    spreadProps(root, api.getRootProps(), machine.scope.id)
    set(".wheel-picker-label", api.getLabelProps())
    set(".wheel-picker-control", api.getControlProps())
    set(".wheel-picker-viewport", api.getViewportProps())
    set(".wheel-picker-items", api.getItemGroupProps())
    set(".wheel-picker-highlight", api.getHighlightProps())
    set(".wheel-picker-highlight-items", api.getHighlightItemGroupProps())
    root.querySelector(".wheel-picker-items")!.replaceChildren(
      ...api.items.map(({ item, index }) => {
        const el = document.createElement("li")
        el.className = styles.item ?? ""
        el.textContent = item.label
        spreadProps(el, api.getItemProps({ item, index }), machine.scope.id)
        return el
      }),
    )
    root.querySelector(".wheel-picker-highlight-items")!.replaceChildren(
      ...api.highlightItems.map(({ item, index }) => {
        const el = document.createElement("li")
        el.className = styles.highlightItem ?? ""
        el.textContent = item.label
        spreadProps(el, api.getHighlightItemProps({ item, index }), machine.scope.id)
        return el
      }),
    )
    main.querySelector(".wheel-picker-output")!.textContent = `Controlled value: ${api.valueAsString}`
  }
  main.querySelectorAll<HTMLButtonElement>("[data-value]").forEach((button) =>
    button.addEventListener("click", () => {
      value = button.dataset.value!
      machine.updateProps({ value })
    }),
  )
  render()
  machine.subscribe(render)
  return mount(main, [machine])
}
