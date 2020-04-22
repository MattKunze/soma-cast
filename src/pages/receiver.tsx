import React from "react"
import { Flex } from "@chakra-ui/core"
import Head from "next/head"

export default () => {
  return (
    <Flex
      direction="column"
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      p={10}
      backgroundImage="url('./shirts.svg')"
    >
      <Head>
        <script src="./initializeCastReceiver.js"></script>
      </Head>
      <cast-media-player
        style={{
          display: "none",
        }}
      ></cast-media-player>
    </Flex>
  )
}
