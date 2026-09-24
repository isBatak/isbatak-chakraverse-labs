"use client"

import { createWheelPickerCollection } from "@isbatak/ark-wheel-picker/react"

import { WheelPicker } from "../ui/wheel-picker"

const collection = createWheelPickerCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular", disabled: true },
    { label: "Svelte", value: "svelte" },
    { label: "Solid", value: "solid" },
    { label: "Preact", value: "preact" },
  ],
})

export function ArkWheelPickerExample() {
  return (
    <WheelPicker.Root collection={collection} defaultValue="svelte" variant="solid" maxW="60">
      <WheelPicker.Label>Framework</WheelPicker.Label>
      <WheelPicker.Control>
        <WheelPicker.Viewport>
          <WheelPicker.ItemGroup>
            <WheelPicker.Context>
              {(api) =>
                api.items.map(({ item, index, key }) => (
                  <WheelPicker.Item key={key} item={item} index={index}>
                    {item.label}
                  </WheelPicker.Item>
                ))
              }
            </WheelPicker.Context>
          </WheelPicker.ItemGroup>
          <WheelPicker.Highlight>
            <WheelPicker.HighlightItemGroup>
              <WheelPicker.Context>
                {(api) =>
                  api.highlightItems.map(({ item, index, key }) => (
                    <WheelPicker.HighlightItem key={key} item={item} index={index}>
                      {item.label}
                    </WheelPicker.HighlightItem>
                  ))
                }
              </WheelPicker.Context>
            </WheelPicker.HighlightItemGroup>
          </WheelPicker.Highlight>
        </WheelPicker.Viewport>
      </WheelPicker.Control>
      <WheelPicker.HiddenSelect />
    </WheelPicker.Root>
  )
}
