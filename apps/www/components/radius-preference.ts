import { type RadiusPreset, radiusPresets } from "@isbatak/panda-ds/radius"

export const RADIUS_STORAGE_KEY = "radius"

export const defaultSiteRadius: RadiusPreset = "none"

export const isRadiusPreset = (value: unknown): value is RadiusPreset => radiusPresets.includes(value as RadiusPreset)

export const applyStoredRadiusScript = `try{var r=localStorage.getItem(${JSON.stringify(RADIUS_STORAGE_KEY)});if(${JSON.stringify(radiusPresets)}.includes(r))document.documentElement.dataset.radius=r}catch(e){}`
