import React, { useEffect, useState } from "react"
import { Flex } from "@chakra-ui/core"
import Head from "next/head"
import useSWR from "swr"

import { StationDetails } from "components"
import { PlaylistEntry } from "types"
import { isServer } from "utils"

const getCastInstance = () =>
  isServer()
    ? undefined
    : window.cast?.framework?.CastReceiverContext.getInstance()

const useCastMessageReceiver = () => {
  const [instance, setInstance] = useState(getCastInstance())
  const [station, setStation] = useState<string | undefined>(undefined)
  useEffect(() => {
    if (instance) {
      instance.addCustomMessageListener("urn:x-cast:soma-cast", (ev) => {
        console.warn("received message", ev)
        const { data } = ev
        if (data.station) {
          setStation(data.station)
        }
      })
    } else {
      setTimeout(() => setInstance(getCastInstance()), 1000)
    }
  }, [instance])

  return station
}

const StationContainer = ({ station }: { station: string }) => {
  const { data: stationInfo } = useSWR(`/api/stations/${station}`)
  const { data: playlist } = useSWR(`/api/playlist/${station}`, {
    refreshInterval: 10000,
    onSuccess: (data: PlaylistEntry[], key, config) => {
      data.forEach((entry) => {
        entry.timestamp = new Date(entry.timestamp)
      })
    },
  })

  if (stationInfo) {
    return (
      <StationDetails
        id={stationInfo.id}
        title={stationInfo.title}
        description={stationInfo.description}
        thumbnail={stationInfo.thumbnail}
        playlist={playlist}
      />
    )
  } else {
    return <div>Loading {station}</div>
  }
}

export default function ReceiverPage() {
  const station = useCastMessageReceiver()

  return (
    <Flex
      direction="column"
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      p={10}
      background="linear-gradient(to bottom, #f1f2b5, #135058)"
    >
      <Head>
        <script src="./initializeCastReceiver.js"></script>
      </Head>
      <cast-media-player
        style={{
          display: "none",
        }}
      ></cast-media-player>
      {station && <StationContainer station={station} />}
    </Flex>
  )
}

// opt-out of static page optimization
export async function getServerSideProps() {
  return {
    props: {},
  }
}
