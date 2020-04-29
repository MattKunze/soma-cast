import React from "react"
import { Box, Flex } from "@chakra-ui/core"

import { Controls, StationList } from "components"

export default function IndexPage() {
  return (
    <Flex p={10} direction="column">
      <Box pb={3}>
        <Controls />
      </Box>
      <StationList />
    </Flex>
  )
}
