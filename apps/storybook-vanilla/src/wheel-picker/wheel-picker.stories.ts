import { wheelPickerArgs, wheelPickerArgTypes } from "@isbatak/storybook-shared"
import type { Meta, StoryObj } from "@storybook/html-vite"
import { fn } from "storybook/test"
import { createBasic, type BasicProps } from "./basic"
import { createControlled } from "./controlled"
import { createMultiple } from "./multiple"

const meta = {
  title: "Wheel Picker",
} satisfies Meta

export default meta

export const Basic: StoryObj<BasicProps> = {
  render: (args) => createBasic(args),
  args: { ...wheelPickerArgs, onValueChange: fn() },
  argTypes: wheelPickerArgTypes,
}

export const Controlled: StoryObj = {
  render: () => createControlled(),
}

export const Multiple: StoryObj = {
  render: () => createMultiple(),
}
