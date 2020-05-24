import React from "react"
import { Flex } from "@chakra-ui/core"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import useSWR from "swr"

import { StationDetails } from "components"
import { fetchStation } from "services/somafm"
import { PlaylistEntry, StationInfo } from "types"
import { paramToString } from "utils"

interface Props {
  initialData: StationInfo
}
export default function StationPage({ initialData }: Props) {
  const { station } = useRouter().query
  const { data: stationInfo } = useSWR(`/api/stations/${station}`, null, {
    initialData,
  })
  const { data: playlist } = useSWR(`/api/playlist/${station}`, {
    refreshInterval: 10000,
    onSuccess: (data: PlaylistEntry[], key, config) => {
      data.forEach((entry) => {
        entry.timestamp = new Date(entry.timestamp)
      })
    },
  })
  if (!stationInfo) {
    console.error(`Invalid station: ${station}`)
    return null
  }

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
        id={stationInfo.id}
        title={stationInfo.title}
        description={stationInfo.description}
        thumbnail={stationInfo.thumbnail}
        playlist={playlist}
      />
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { station } = context.query
  return {
    props: {
      initialData: await fetchStation(paramToString(station)),
    },
  }
}
