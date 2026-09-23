# isbatak/zag

Zag state machines developed outside [Zag](https://github.com/chakra-ui/zag) before they are contributed upstream.

## Packages

- [`@isbatak/zag-wheel-picker`](packages/wheel-picker): wheel picker state machine

## Development

```sh
pnpm install
pnpm test        # run tests
pnpm typecheck   # typecheck all workspaces
pnpm lint        # oxlint
pnpm format      # oxfmt
pnpm build       # build packages
```

## Storybook

Each Zag framework adapter has its own Storybook in `apps/storybook-<framework>` (React, Vue, Svelte, Solid, Preact,
vanilla). `apps/storybook` combines them into one.

```sh
pnpm storybook         # start all of them; open http://localhost:6006
pnpm build:storybook   # static build in apps/storybook/storybook-static
```

## License

MIT
