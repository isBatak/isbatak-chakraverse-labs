import { render, type VNode } from "preact"
import { examples } from "virtual:examples"

let count = 0

const withUniqueIdRoot = (vnode: VNode) => Object.assign(vnode, { __m: [count++, 0] })

export function mount(id: string, container: HTMLElement) {
  const Example = examples[id]
  render(withUniqueIdRoot(<Example />), container)
  return () => render(null, container)
}
