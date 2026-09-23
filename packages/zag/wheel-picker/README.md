# @isbatak/zag-wheel-picker

Core logic for the wheel-picker widget implemented as a state machine, built on [Zag](https://zagjs.com).

This package will be contributed to [Zag](https://github.com/chakra-ui/zag) as `@zag-js/wheel-picker`. Until then, it is
published here as a standalone package.

## Installation

```sh
pnpm add @isbatak/zag-wheel-picker
```

## Usage

```ts
import * as wheelPicker from "@isbatak/zag-wheel-picker"

const collection = wheelPicker.collection({ items: ["Apple", "Banana", "Cherry"] })
```

Use `wheelPicker.machine` and `wheelPicker.connect` with the Zag adapter for your framework (`@zag-js/react`,
`@zag-js/vue`, `@zag-js/solid`, `@zag-js/svelte`, …).

## License

MIT © Ivica Batinic
