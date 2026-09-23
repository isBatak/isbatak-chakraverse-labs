import type { VanillaMachine } from "@zag-js/vanilla"

/**
 * Storybook's HTML renderer attaches the returned element after the story function runs and removes it on re-render,
 * so start the machines once the element is in the document and stop them when it leaves.
 */
export function mount<T extends HTMLElement>(element: T, machines: VanillaMachine<any>[]): T {
  let started = false
  const observer = new MutationObserver(() => {
    if (!started && element.isConnected) {
      started = true
      machines.forEach((machine) => machine.start())
    } else if (started && !element.isConnected) {
      observer.disconnect()
      machines.forEach((machine) => machine.stop())
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
  return element
}

export const createElement = (html: string) => {
  const template = document.createElement("template")
  template.innerHTML = html.trim()
  return template.content.firstElementChild as HTMLElement
}
