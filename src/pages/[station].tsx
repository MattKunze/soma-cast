import React from "react"
import { Box } from "@chakra-ui/core"
import { useRouter } from "next/router"

import { Card, SuspenseContainer } from "components"
import { StationDetails } from "types"
import { loadGetInitialProps } from "next/dist/next-server/lib/utils"

const StationCard = ({ station }: { station: StationDetails }) => (
  <Card
    key={station.id}
    title={station.title}
    description={station.description}
    imageUrl={station.thumbnail}
  >
    {station.playlist}
  </Card>
)

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
