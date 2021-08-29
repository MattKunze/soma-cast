import { createElement } from "react"
import { Story } from "@storybook/react"
import * as HeroIcons from "heroicons-react"

import { PaletteColor } from "../../../types/tailwind"
import Button, { ButtonProps } from "./"

export default {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    icon: {
      control: {
        type: "select",
        options: Object.keys(HeroIcons).filter((t) => t.endsWith("Outline")),
      },
    },
  },
}

// encapsulate type conversion garbage here - prop type is `ReactNode` but
// we edit the control as a string
const renderIcon = (icon: unknown) =>
  createElement(HeroIcons[icon as keyof typeof HeroIcons])

const Template: Story<ButtonProps> = ({ icon, ...args }) => (
  <Button icon={icon ? renderIcon(icon) : undefined} {...args} />
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
  icon: "SparklesOutline",
  color: PaletteColor.Pink,
}
