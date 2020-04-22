import React, { useCallback } from "react"
import { Box, Button, ButtonGroup } from "@chakra-ui/core"
import { useRouter } from "next/router"

import { Card, SuspenseContainer } from "components"
import { StationDetails } from "types"
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
    <Box p={10}>
      <SuspenseContainer<StationDetails>
        fallback={<div>Loading...</div>}
        endpoint={`api/stations/${station}`}
      >
        {(data) => <StationCard station={data} />}
      </SuspenseContainer>
    </Box>
  )
}
