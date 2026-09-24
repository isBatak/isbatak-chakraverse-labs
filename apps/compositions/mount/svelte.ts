import { mount as mountComponent, unmount } from "svelte"
import { examples } from "virtual:examples"

export function mount(id: string, container: HTMLElement) {
  const component = mountComponent(examples[id], { target: container })
  return () => {
    unmount(component)
  }
}
