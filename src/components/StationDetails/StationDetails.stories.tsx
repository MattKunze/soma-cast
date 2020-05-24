import React from "react"
import { Flex } from "@chakra-ui/core"
import { withKnobs, select } from "@storybook/addon-knobs"

import { StationDetails } from "components"
import { playlist, stationList } from "mocks"

export default {
  title: "Components/StationDetails",
  component: StationDetails,
  decorators: [withKnobs],
}

const stationOptions = stationList.reduce((memo, station) => {
  memo[station.title] = station.id
  return memo
}, {})
const playlistEntries = playlist()

export const DefaultLayout = () => {
  const stationId = select("Station", stationOptions, stationList[0].id)
  const station = stationList.find((t) => t.id === stationId)
  return (
    <Flex
      direction="column"
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
    >
      <StationDetails
        id={station.id}
        title={station.title}
        description={station.description}
        thumbnail={station.thumbnail}
        playlist={playlistEntries}
      />
    </Flex>
  )
}
