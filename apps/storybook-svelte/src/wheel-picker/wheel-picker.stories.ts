import { timeInputArgs, timeInputArgTypes, wheelPickerArgs, wheelPickerArgTypes } from "@isbatak/storybook-shared"
import type { Meta, StoryObj } from "@storybook/svelte-vite"
import { fn } from "storybook/test"
import BasicExample from "./basic.svelte"
import ControlledExample from "./controlled.svelte"
import MultipleExample from "./multiple.svelte"
import TimeInputExample from "./time-input.svelte"

const meta = {
  title: "Wheel Picker",
} satisfies Meta

export default meta

export const Basic: StoryObj<typeof BasicExample> = {
  render: (args) => ({ Component: BasicExample, props: args }),
  args: { ...wheelPickerArgs, onValueChange: fn() },
  argTypes: wheelPickerArgTypes,
}

export const Controlled: StoryObj<typeof ControlledExample> = {
  render: () => ({ Component: ControlledExample }),
}

export const Multiple: StoryObj<typeof MultipleExample> = {
  render: () => ({ Component: MultipleExample }),
}

export const TimeInput: StoryObj<typeof TimeInputExample> = {
  render: (args) => ({ Component: TimeInputExample, props: args }),
  args: timeInputArgs,
  argTypes: timeInputArgTypes,
}
