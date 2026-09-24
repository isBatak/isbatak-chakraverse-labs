import { examples } from "virtual:examples"

export function mount(id: string, container: HTMLElement): () => void {
  return examples[id](container)
}
