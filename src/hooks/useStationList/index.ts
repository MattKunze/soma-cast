import { useQuery } from "react-query"

import { ApiBaseUrl } from "config"
import { StationInfo } from "types"

export default function useStationList() {
  return useQuery("station-list", async () => {
    const response = await fetch(`${ApiBaseUrl}/stations`)
    const json = await response.json()
    return json as StationInfo[]
  })
}
