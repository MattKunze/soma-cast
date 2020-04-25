import React, { useCallback } from "react"
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/core"
import { useRouter } from "next/router"

import { Card, SuspenseContainer } from "components"
import { PlaylistEntry, StationDetails } from "types"
import { castMedia } from "utils"

const StationCard = ({ station }: { station: StationDetails }) => {
  const playStream = useCallback(() => {
    castMedia(station.streamUrl)
  }, [station.streamUrl])

  return (
    <Card
      key={station.id}
      title={station.title}
      description={station.description}
      imageUrl={station.thumbnail}
    >
      <ButtonGroup spacing={2}>
        <Button onClick={playStream}>Play</Button>
        <Button>
          <google-cast-launcher style={{ width: "38px", height: "38px" }} />
        </Button>
      </ButtonGroup>
    </Card>
  )
}

export default () => {
  const { station } = useRouter().query
  return (
    <Flex p={10} direction="row">
      <SuspenseContainer<StationDetails>
        fallback={<div>Loading...</div>}
        endpoint={`api/stations/${station}`}
      >
        {(data) => <StationCard station={data} />}
      </SuspenseContainer>
      <SuspenseContainer<PlaylistEntry[]>
        fallback={<div>Loading...</div>}
        endpoint={`api/playlist/${station}`}
      >
        {(data) => <pre>{JSON.stringify(data, null, "  ")}</pre>}
      </SuspenseContainer>
    </Flex>
  )
}
