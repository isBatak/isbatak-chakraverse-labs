import { frameworkCollection, type WheelPickerControls } from "@isbatak/storybook-shared"
import * as wheelPicker from "@isbatak/zag-wheel-picker"
import { normalizeProps, spreadProps, VanillaMachine } from "@zag-js/vanilla"
import { createElement, mount } from "../mount"

export interface BasicProps extends Partial<WheelPickerControls> {
  onValueChange?: (details: wheelPicker.ValueChangeDetails) => void
}

export function createBasic(props: BasicProps) {
  const main = createElement(`
    <main class="wheel-picker">
      <div class="wheel-picker-root">
        <label class="wheel-picker-label">Framework</label>
        <div class="wheel-picker-control">
          <div class="wheel-picker-viewport">
            <ul class="wheel-picker-items"></ul>
            <div class="wheel-picker-highlight"><ul class="wheel-picker-highlight-items"></ul></div>
          </div>
        </div>
        <select class="wheel-picker-hidden-select"></select>
      </div>
      <output class="wheel-picker-output"></output>
    </main>
  `)
  const root = main.querySelector<HTMLElement>(".wheel-picker-root")!
  const machine = new VanillaMachine(wheelPicker.machine, {
    id: crypto.randomUUID(),
    collection: frameworkCollection,
    defaultValue: "react",
    name: "framework",
    ...props,
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
    set(".wheel-picker-hidden-select", api.getHiddenSelectProps())
    root.querySelector(".wheel-picker-items")!.replaceChildren(
      ...api.items.map(({ item, index }) => {
        const el = document.createElement("li")
        el.textContent = item.label
        spreadProps(el, api.getItemProps({ item, index }), machine.scope.id)
        return el
      }),
    )
    root.querySelector(".wheel-picker-highlight-items")!.replaceChildren(
      ...api.highlightItems.map(({ item, index }) => {
        const el = document.createElement("li")
        el.textContent = item.label
        spreadProps(el, api.getHighlightItemProps({ item, index }), machine.scope.id)
        return el
      }),
    )
    root.querySelector(".wheel-picker-hidden-select")!.replaceChildren(
      ...frameworkCollection.items.map((item) => {
        const option = new Option(item.label, item.value)
        option.disabled = !!item.disabled
        return option
      }),
    )
    main.querySelector(".wheel-picker-output")!.textContent = `Selected: ${api.valueAsString}`
  }
  render()
  machine.subscribe(render)
  return mount(main, [machine])
}
