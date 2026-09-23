import { timeInputArgs, timeInputArgTypes, wheelPickerArgs, wheelPickerArgTypes } from "@isbatak/storybook-shared"
import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { fn } from "storybook/test"
import { h } from "vue"
import BasicExample from "./basic.vue"
import ControlledExample from "./controlled.vue"
import MultipleExample from "./multiple.vue"
import TimeInputExample from "./time-input.vue"

const meta = {
  title: "Wheel Picker",
} satisfies Meta

export default meta

export const Basic: StoryObj<typeof BasicExample> = {
  render: (args) => ({ setup: () => () => h(BasicExample, args) }),
  args: { ...wheelPickerArgs, onValueChange: fn() },
  argTypes: wheelPickerArgTypes,
}

export const Controlled: StoryObj = {
  render: () => ({ setup: () => () => h(ControlledExample) }),
}

export const Multiple: StoryObj = {
  render: () => ({ setup: () => () => h(MultipleExample) }),
}

export const TimeInput: StoryObj<typeof TimeInputExample> = {
  render: (args) => ({ setup: () => () => h(TimeInputExample, args) }),
  args: timeInputArgs,
  argTypes: timeInputArgTypes,
}
