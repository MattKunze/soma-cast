import { useQuery } from "react-query"

import { ApiBaseUrl } from "config"
import { PlaylistEntry } from "types"

interface PlaylistEntryDto {
  title: string
  artist: string
  album: string
  timestamp: Date
}

export default function usePlaylist(stationId: string) {
  return useQuery(
    ["playlist", stationId],
    async () => {
      const response = await fetch(`${ApiBaseUrl}/playlist/${stationId}`)
      const json = (await response.json()) as PlaylistEntryDto[]
      return json.map<PlaylistEntry>((entry) => ({
        ...entry,
        timestamp: new Date(entry.timestamp),
      }))
    },
    {
      refetchInterval: 10000,
    }
  )
}
