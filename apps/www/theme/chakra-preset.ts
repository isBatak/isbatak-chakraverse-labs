import chakraPresetV1 from "@chakra-ui/panda-preset"
import type { Preset } from "@pandacss/types"

// The preset is typed against @pandacss/types v1; its config objects are compatible with v2 at runtime
const chakraPreset = chakraPresetV1 as unknown as Preset

type TokenTree = { [key: string]: unknown }

const isObject = (value: unknown): value is TokenTree => typeof value === "object" && value !== null

// Panda v2 only resolves a semantic token in utilities (`color: fg.muted` -> `var(--colors-fg-muted)`) when its
// conditional value has a `base` key. The Chakra preset, written for Panda v1, uses `_light` instead.
// Light is the default mode here, so `_light` becomes `base`.
function withBaseCondition(tree: TokenTree): TokenTree {
  return Object.fromEntries(
    Object.entries(tree).map(([key, node]) => {
      if (!isObject(node)) return [key, node]
      if (key === "value") {
        const { _light, ...conditions } = node
        return [key, _light === undefined || "base" in node ? node : { base: _light, ...conditions }]
      }
      return [key, withBaseCondition(node)]
    }),
  )
}

export const chakra: Preset = {
  ...chakraPreset,
  theme: {
    ...chakraPreset.theme,
    semanticTokens: withBaseCondition(chakraPreset.theme?.semanticTokens ?? {}),
  },
}
