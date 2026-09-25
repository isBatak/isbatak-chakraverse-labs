import { wheelPicker as wheelPickerRecipe } from "@isbatak/panda-ds/recipes"
import { hourCollection, meridiemCollection, minuteCollection } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, spreadProps, VanillaMachine } from "@zag-js/vanilla"
import { createElement, mount } from "../mount"

const styles = wheelPickerRecipe()

export function createMultiple() {
  const main = createElement(`
    <main class="wheel-picker">
      <div class="wheel-picker-group" role="group" aria-label="Time"></div>
      <output class="wheel-picker-output"></output>
    </main>
  `)
  const group = main.querySelector<HTMLElement>(".wheel-picker-group")!,
    output = main.querySelector<HTMLOutputElement>(".wheel-picker-output")!,
    configs = [
      [hourCollection, "9", true],
      [minuteCollection, "41", true],
      [meridiemCollection, "AM", false],
    ] as const
  const machines = configs.map(
    ([collection, defaultValue, infinite]) =>
      new VanillaMachine(wheelPicker.machine, { id: crypto.randomUUID(), collection, defaultValue, infinite }),
  )
  // Build each column once: replacing the control on every render would drop focus and keyboard input.
  const columns = machines.map((machine) => {
    const root = document.createElement("div"),
      control = document.createElement("div"),
      viewport = document.createElement("div"),
      items = document.createElement("ul"),
      highlight = document.createElement("div"),
      highlights = document.createElement("ul")
    root.className = styles.root ?? ""
    control.className = styles.control ?? ""
    viewport.className = styles.viewport ?? ""
    items.className = styles.itemGroup ?? ""
    highlight.className = styles.highlight ?? ""
    highlights.className = styles.highlightItemGroup ?? ""
    highlight.append(highlights)
    viewport.append(items, highlight)
    control.append(viewport)
    root.append(control)
    group.append(root)
    return { machine, root, control, viewport, items, highlight, highlights }
  })
  function render() {
    for (const { machine, root, control, viewport, items, highlight, highlights } of columns) {
      const api = wheelPicker.connect(machine.service, normalizeProps)
      spreadProps(root, api.getRootProps(), machine.scope.id)
      spreadProps(control, api.getControlProps(), machine.scope.id)
      spreadProps(viewport, api.getViewportProps(), machine.scope.id)
      spreadProps(items, api.getItemGroupProps(), machine.scope.id)
      spreadProps(highlight, api.getHighlightProps(), machine.scope.id)
      spreadProps(highlights, api.getHighlightItemGroupProps(), machine.scope.id)
      items.replaceChildren(
        ...api.items.map(({ item, index }) => {
          const el = document.createElement("li")
          el.className = styles.item ?? ""
          el.textContent = item.label
          spreadProps(el, api.getItemProps({ item, index }), machine.scope.id)
          return el
        }),
      )
      highlights.replaceChildren(
        ...api.highlightItems.map(({ item, index }) => {
          const el = document.createElement("li")
          el.className = styles.highlightItem ?? ""
          el.textContent = item.label
          spreadProps(el, api.getHighlightItemProps({ item, index }), machine.scope.id)
          return el
        }),
      )
    }
    const [hour, minute, meridiem] = machines.map(
      (machine) => wheelPicker.connect(machine.service, normalizeProps).valueAsString,
    )
    output.textContent = `Selected time: ${hour}:${minute} ${meridiem}`
  }
  render()
  machines.forEach((machine) => machine.subscribe(render))
  return mount(main, machines)
}
