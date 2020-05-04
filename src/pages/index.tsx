import React from "react"
import { GetServerSideProps } from "next"
import useSWR from "swr"
import { Box, Flex } from "@chakra-ui/core"

import { Controls, StationList } from "components"
import { fetchStations } from "services/somafm"
import { StationInfo } from "types"

interface Props {
  initialData: StationInfo[]
}
export default function IndexPage({ initialData }: Props) {
  const { data } = useSWR<StationInfo[]>("/api/stations", {
    initialData,
  })
  return (
    <Flex p={10} direction="column">
      <Box pb={3}>
        <Controls />
      </Box>
      <StationList stations={data} />
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      initialData: await fetchStations(),
    },
  }
}
