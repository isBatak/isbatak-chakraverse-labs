"use client"

import { type RadiusPreset, radiusPresets } from "@isbatak/panda-ds/radius"
import { Portal } from "@ark-ui/react/portal"
import { useEffect, useState } from "react"

import { RADIUS_STORAGE_KEY, defaultSiteRadius, isRadiusPreset } from "./radius-preference"
import { Button } from "./ui/button"
import { Icon } from "./ui/icon"
import { Popover } from "./ui/popover"
import { Slider } from "./ui/slider"

function useRadiusPreference() {
  const [radius, setRadius] = useState<RadiusPreset>(defaultSiteRadius)

  useEffect(() => {
    const applied = document.documentElement.dataset.radius
    if (isRadiusPreset(applied)) setRadius(applied)
  }, [])

  const changeRadius = (preset: RadiusPreset) => {
    setRadius(preset)
    document.documentElement.dataset.radius = preset
    try {
      localStorage.setItem(RADIUS_STORAGE_KEY, preset)
    } catch {}
  }

  return [radius, changeRadius] as const
}

export function RadiusPicker() {
  const [radius, changeRadius] = useRadiusPreference()

  return (
    <Popover.Root positioning={{ placement: "bottom-end" }}>
      <Popover.Trigger asChild>
        <Button variant="ghost" size="xs" px="0" aspectRatio="square" aria-label="Customize theme">
          <Icon size="sm" name="color-picker" />
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content w="72">
            <Popover.Body>
              <Slider.Root
                min={0}
                max={radiusPresets.length - 1}
                value={[radiusPresets.indexOf(radius)]}
                onValueChange={({ value: [index] }) => {
                  const preset = index === undefined ? undefined : radiusPresets[index]
                  if (preset) changeRadius(preset)
                }}
              >
                <Slider.Label>Radius</Slider.Label>
                <Slider.Control>
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb index={0}>
                    <Slider.HiddenInput />
                  </Slider.Thumb>
                  <Slider.MarkerGroup>
                    <Slider.Marker value={0}>
                      <Slider.MarkerIndicator />
                      <Slider.MarkerLabel>none</Slider.MarkerLabel>
                    </Slider.Marker>
                    <Slider.Marker value={1}>
                      <Slider.MarkerIndicator />
                      <Slider.MarkerLabel>xs</Slider.MarkerLabel>
                    </Slider.Marker>
                    <Slider.Marker value={2}>
                      <Slider.MarkerIndicator />
                      <Slider.MarkerLabel>sm</Slider.MarkerLabel>
                    </Slider.Marker>
                    <Slider.Marker value={3}>
                      <Slider.MarkerIndicator />
                      <Slider.MarkerLabel>md</Slider.MarkerLabel>
                    </Slider.Marker>
                    <Slider.Marker value={4}>
                      <Slider.MarkerIndicator />
                      <Slider.MarkerLabel>lg</Slider.MarkerLabel>
                    </Slider.Marker>
                    <Slider.Marker value={5}>
                      <Slider.MarkerIndicator />
                      <Slider.MarkerLabel>xl</Slider.MarkerLabel>
                    </Slider.Marker>
                    <Slider.Marker value={6}>
                      <Slider.MarkerIndicator />
                      <Slider.MarkerLabel>2xl</Slider.MarkerLabel>
                    </Slider.Marker>
                  </Slider.MarkerGroup>
                </Slider.Control>
              </Slider.Root>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
