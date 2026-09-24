import { render } from "solid-js/web"
import { examples } from "virtual:examples"

export function mount(id: string, container: HTMLElement) {
  const Example = examples[id]
  return render(() => <Example />, container)
}
