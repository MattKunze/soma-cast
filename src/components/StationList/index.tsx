import React from "react"

import { SuspenseContainer } from "components"
import { StationInfo } from "types"
import LoadingFallback from "./LoadingFallback"
import StationList from "./StationList"

export default function StationListContainer() {
  return (
    <SuspenseContainer<StationInfo[]>
      fallback={<LoadingFallback />}
      endpoint="api/stations"
    >
      {(data) => <StationList stations={data} />}
    </SuspenseContainer>
  )
}
