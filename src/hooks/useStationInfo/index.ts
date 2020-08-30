import { useQuery } from "react-query"

import { ApiBaseUrl } from "config"
import { StationInfo } from "types"

export default function useStationList(stationId: string) {
  return useQuery(["station-list", stationId], async () => {
    const response = await fetch(`${ApiBaseUrl}/stations/${stationId}`)
    const json = await response.json()
    return json as StationInfo
  })
}
