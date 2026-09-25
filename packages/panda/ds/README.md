# @isbatak/panda-ds

[Panda CSS](https://panda-css.com) design system with Chakra-style tokens, recipes and slot recipes, built with
`panda lib`.

## Installation

```sh
pnpm add @isbatak/panda-ds
```

## Usage

```ts
import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  designSystem: "@isbatak/panda-ds",
  preflight: true,
  include: ["./src/**/*.{ts,tsx}"],
})
```

Styles are imported from the package itself:

```tsx
import { css } from "@isbatak/panda-ds/css"
import { button } from "@isbatak/panda-ds/recipes"
```

Also exported: `/patterns`, `/jsx`, `/tokens`, the raw theme from `/theme` and radius presets from `/radius`.

## License

MIT © Ivica Batinic
