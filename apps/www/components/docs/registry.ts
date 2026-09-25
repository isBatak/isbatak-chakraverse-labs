import type { FrameworkId } from "./framework"
import { SITE_URL } from "./site-url"
import type { StylingId } from "./styling"

export const registryName = (example: string, framework: FrameworkId, styling: StylingId) =>
  styling === "css" ? `${example}-${framework}` : `${example}-${framework}-${styling}`

export const registryUrl = (example: string, framework: FrameworkId, styling: StylingId) =>
  `${SITE_URL}/r/${registryName(example, framework, styling)}.json`
