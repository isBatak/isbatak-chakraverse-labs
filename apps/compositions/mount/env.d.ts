declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent
  export default component
}

declare module "*.css"

declare module "virtual:examples" {
  export const examples: Record<string, any>
}
