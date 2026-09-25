import type { Snippet } from "svelte"
import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements"

export type HTMLTag = keyof SvelteHTMLElements

export type HTMLProps<T extends HTMLTag> = SvelteHTMLElements[T]

export type PropsFn<T extends HTMLTag> = (props?: HTMLProps<T>) => HTMLAttributes<HTMLElement>

export interface PolymorphicProps<T extends HTMLTag> {
  children?: Snippet
  asChild?: Snippet<[PropsFn<T>]>
}

export interface RefAttribute<T extends Element = Element> {
  ref?: T | null | undefined
}
