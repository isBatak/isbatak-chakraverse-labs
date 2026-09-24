export const radiusPresets = ["none", "xs", "sm", "md", "lg", "xl", "2xl"] as const

export type RadiusPreset = (typeof radiusPresets)[number]

export const defaultRadiusPreset: RadiusPreset = "sm"

export const radiusScale: Record<RadiusPreset, { l1: string; l2: string; l3: string }> = {
  none: { l1: "none", l2: "none", l3: "none" },
  xs: { l1: "2xs", l2: "xs", l3: "sm" },
  sm: { l1: "xs", l2: "sm", l3: "md" },
  md: { l1: "sm", l2: "md", l3: "lg" },
  lg: { l1: "md", l2: "lg", l3: "xl" },
  xl: { l1: "lg", l2: "xl", l3: "2xl" },
  "2xl": { l1: "xl", l2: "2xl", l3: "3xl" },
}

export const radiusCondition = (preset: RadiusPreset) => `radius${preset.charAt(0).toUpperCase()}${preset.slice(1)}`
