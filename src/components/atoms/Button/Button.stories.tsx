import { Story } from "@storybook/react"

import { PaletteColor } from "../../../types/tailwind"
import HeroIcon, { IconName, IconNames } from "../HeroIcon"
import Button, { ButtonProps } from "./"

export default {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    icon: {
      control: {
        type: "select",
        options: IconNames,
      },
    },
  },
}

const Template: Story<ButtonProps> = ({ icon, ...args }) => (
  <Button
    icon={icon ? <HeroIcon icon={icon as IconName} /> : undefined}
    {...args}
  />
)

export const DefaultArgs: Story<ButtonProps> = Template.bind({})
DefaultArgs.args = {
  text: "Default text",
}

export const WithText = Template.bind({})
WithText.args = {
  text: "Just text",
  color: PaletteColor.Lime,
}
WithText.argTypes = {
  icon: { table: { disable: true } },
  rightIcon: { table: { disable: true } },
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  text: "Icons even",
  icon: "SparklesIcon",
  color: PaletteColor.Pink,
}
