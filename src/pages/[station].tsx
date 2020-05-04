import React, { Suspense } from "react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import useSWR from "swr"
import { Button, ButtonGroup, Flex } from "@chakra-ui/core"

import { Card } from "components"
import { usePlaylistCaster } from "hooks"
import { fetchStation } from "services/somafm"
import { PlaylistEntry, StationInfo } from "types"
import { isServer, paramToString } from "utils"

const StationCard = ({ station }: { station: StationInfo }) => {
  const castPlaylist = usePlaylistCaster()

  return (
    <Card
      key={station.id}
      title={station.title}
      description={station.description}
      imageUrl={station.thumbnail}
    >
      <ButtonGroup spacing={2}>
        <Button onClick={() => castPlaylist(station.playlist)}>Play</Button>
        <Button>
          <google-cast-launcher style={{ width: "38px", height: "38px" }} />
        </Button>
      </ButtonGroup>
    </Card>
  )
}

const PlaylistContainer = ({ station }: { station: StationInfo }) => {
  const { data } = useSWR<PlaylistEntry[]>(`/api/playlist/${station.id}`, {
    suspense: true,
    refreshInterval: 5000,
  })
  return <pre>{JSON.stringify(data, null, "  ")}</pre>
}

interface Props {
  initialData: StationInfo
}
export default function StationPage({ initialData }: Props) {
  const { station } = useRouter().query
  const { data } = useSWR(`/api/stations/${station}`, null, { initialData })
  if (initialData) {
    return (
      <Flex p={10} direction="row">
        <StationCard station={data} />
        {!isServer() && (
          <Suspense fallback={<div>Loading playlist...</div>}>
            <PlaylistContainer station={data} />
          </Suspense>
        )}
      </Flex>
    )
  } else {
    return null
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { station } = context.query
  return {
    props: {
      initialData: await fetchStation(paramToString(station)),
    },
  }
}
