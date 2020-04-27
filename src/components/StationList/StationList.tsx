import React from "react"
import { Box, IconButton, Grid } from "@chakra-ui/core"
import Link from "next/link"

import { Card } from "components"
import { usePlaylistCaster } from "hooks"
import { StationInfo } from "types"

interface Props {
  stations: StationInfo[]
}

export default (props: Props) => {
  const castPlaylist = usePlaylistCaster()

  return (
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
              <Box position="absolute" top={2} right={2}>
                <IconButton
                  variant="outline"
                  variantColor="pink"
                  aria-label="Play"
                  icon="chevron-right"
                  onClick={(ev) => {
                    castPlaylist(station.playlist)
                    ev.preventDefault()
                  }}
                />
              </Box>
              <Box>Listeners: {station.listeners}</Box>
              <Box>Now Playing: {station.nowPlaying}</Box>
            </Card>
          </a>
        </Link>
      ))}
    </Grid>
  )
}
