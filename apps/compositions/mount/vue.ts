import { examples } from "virtual:examples"
import { createApp } from "vue"

let count = 0

export function mount(id: string, container: HTMLElement) {
  const app = createApp(examples[id])
  app.config.idPrefix = `v${count++}`
  app.mount(container)
  return () => app.unmount()
}
