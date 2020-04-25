import React from "react"
import { Box, Grid } from "@chakra-ui/core"
import Link from "next/link"

import { Card } from "components"
import { StationInfo } from "types"

interface Props {
  stations: StationInfo[]
}

export default (props: Props) => (
  <Grid gap={4} templateColumns={"repeat(auto-fill, minmax(250px, 1fr))"}>
    {props.stations.map((station) => (
      <Link key={station.id} href={"[station]"} as={station.id}>
        <a>
          <Card
            key={station.id}
            title={station.title}
            description={station.description}
            imageUrl={station.thumbnail}
          >
            <Box>Listeners: {station.listeners}</Box>
            <Box>Now Playing: {station.nowPlaying}</Box>
          </Card>
        </a>
      </Link>
    ))}
  </Grid>
)
