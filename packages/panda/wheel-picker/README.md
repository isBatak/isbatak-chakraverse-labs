# @isbatak/panda-wheel-picker

[Panda CSS](https://panda-css.com) slot recipe and preset for the wheel picker. The recipe builds on Chakra-style
semantic tokens (`fg`, `bg.muted`, `colorPalette.*`, `l2` radii).

## Installation

```sh
pnpm add -D @isbatak/panda-wheel-picker
```

## Usage

```ts
import { wheelPickerPreset } from "@isbatak/panda-wheel-picker"
import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  presets: ["@pandacss/preset-base", wheelPickerPreset],
})
```

Or extend your theme with `wheelPickerRecipe` under `theme.extend.slotRecipes.wheelPicker`.

Variants: `variant` (`subtle`, `outline`, `solid`) and `size` (`sm`, `md`, `lg`).

## License

MIT © Ivica Batinic
