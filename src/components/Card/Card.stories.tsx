import React from "react"
import { Flex } from "@chakra-ui/core"
import { withKnobs, text } from "@storybook/addon-knobs"

import { Card } from "components"

export default {
  title: "Components/Card",
  component: Card,
  decorators: [withKnobs],
}

export const DefaultLayout = () => (
  <Flex p={10} direction="column">
    <Card
      title={text("title", "Example Card Title")}
      description={text("description", "This is the description of the thing")}
      imageUrl="https://soma-cast.mattkunze.now.sh/shirts.svg"
    />
  </Flex>
)
