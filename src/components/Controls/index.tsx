import React from "react"
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/core"

import { useCastSession } from "hooks"

export default function Controls() {
  const session = useCastSession()
  return (
    <Flex direction="row" align="center" justify="space-between">
      <Box>{session.castState}</Box>
      <Box>{session.contentId}</Box>
      <ButtonGroup>
        <Slider
          min={0}
          max={100}
          value={session.volume || 0}
          onChange={session.setVolume}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
        <Button onClick={session.toggleMute}>
          {session.isMuted ? "Unmute" : "Mute"}
        </Button>
        <Button onClick={session.stop}>Stop</Button>
        <Button>
          <google-cast-launcher style={{ width: "38px", height: "38px" }} />
        </Button>
      </ButtonGroup>
    </Flex>
  )
}
