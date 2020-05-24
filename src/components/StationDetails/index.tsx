import React from "react"
import { Badge, Box, Skeleton, Stack, Text } from "@chakra-ui/core"

import { Card } from "components"
import { PlaylistEntry } from "types"

interface Props {
  id: string
  title: string
  description: string
  thumbnail: string
  playlist?: PlaylistEntry[]
}

const Heading = (props: Props) => (
  <Stack direction="row" align="center" p={5} spacing={5}>
    <Box
      height={20}
      width={20}
      backgroundImage={`url(${props.thumbnail})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      color="transparent"
    >
      {props.id}
    </Box>
    <Stack direction="column" spacing={2}>
      <Text fontSize="lg">{props.title}</Text>
      <Text fontSize="md" color="gray.500">
        {props.description}
      </Text>
    </Stack>
  </Stack>
)

const NowPlaying = ({ entry }: { entry: PlaylistEntry }) => (
  <Card
    title={entry.title}
    description={`${entry.artist} - ${entry.album}`}
    imageUrl="https://soma-cast.mattkunze.now.sh/shirts.svg"
  />
)

const PlaylistHistory = ({ playlist }: { playlist: PlaylistEntry[] }) => (
  <Stack direction="column" spacing={3}>
    {playlist.map((entry) => (
      <Stack key={entry.timestamp.toISOString()} spacing={2}>
        <Box>
          <Badge variant="outline" variantColor="blue" mr={1}>
            {entry.timestamp.toLocaleTimeString()}
          </Badge>
          {entry.title} - {entry.artist}
        </Box>
      </Stack>
    ))}
  </Stack>
)

const PlaylistHistoryPlaceholder = () => (
  <Stack direction="column" spacing={3}>
    <Skeleton height="30px" />
    <Skeleton height="30px" />
    <Skeleton height="30px" />
    <Skeleton height="30px" />
    <Skeleton height="30px" />
  </Stack>
)

export default function StationDetails(props: Props) {
  return (
    <Stack direction="column" spacing={5} flex="1 1 0px">
      <Heading {...props} />
      <Stack
        direction="row"
        spacing={3}
        px={5}
        flex="1 1 0px"
        overflowY="hidden"
      >
        <Box flex="1 1 0px">
          <Box>
            {props.playlist ? (
              <NowPlaying entry={props.playlist[0]} />
            ) : (
              <Skeleton height="350px" />
            )}
          </Box>
        </Box>
        <Box flex="1 1 0px" overflowY="hidden">
          {props.playlist ? (
            <PlaylistHistory playlist={props.playlist.slice(1)} />
          ) : (
            <PlaylistHistoryPlaceholder />
          )}
        </Box>
      </Stack>
    </Stack>
  )
}
