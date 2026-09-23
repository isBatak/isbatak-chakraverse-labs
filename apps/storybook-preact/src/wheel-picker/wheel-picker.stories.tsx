import { timeInputArgs, timeInputArgTypes, wheelPickerArgs, wheelPickerArgTypes } from "@isbatak/storybook-shared"
import type { Meta, StoryObj } from "@storybook/preact-vite"
import { fn } from "storybook/test"
import { Basic as BasicExample } from "./basic"
import { Controlled as ControlledExample } from "./controlled"
import { Multiple as MultipleExample } from "./multiple"
import { TimeInput as TimeInputExample } from "./time-input"

const meta = {
  title: "Wheel Picker",
} satisfies Meta

export default meta

export const Basic: StoryObj<typeof BasicExample> = {
  render: (args) => <BasicExample {...args} />,
  args: { ...wheelPickerArgs, onValueChange: fn() },
  argTypes: wheelPickerArgTypes,
}

export const Controlled: StoryObj = {
  render: () => <ControlledExample />,
}

export const Multiple: StoryObj = {
  render: () => <MultipleExample />,
}

export const TimeInput: StoryObj<typeof TimeInputExample> = {
  render: (args) => <TimeInputExample {...args} />,
  args: timeInputArgs,
  argTypes: timeInputArgTypes,
}
