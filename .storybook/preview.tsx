import React from "react"
import { addDecorator } from "@storybook/react"
import { CSSReset, ThemeProvider } from "@chakra-ui/core"

const addChakra = (storyFn) => (
  <ThemeProvider>
    <CSSReset />
    {storyFn()}
  </ThemeProvider>
)

addDecorator(addChakra)
