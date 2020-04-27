import axios from "axios"
import { useCallback } from "react"

const getPlaylistStreamUrl = async (playlist: string): Promise<string> => {
  const { data } = await axios.get(
    `api/streamUrl?playlist=${encodeURIComponent(playlist)}`
  )
  return data
}

export default () => {
  return useCallback(async (playlist: string) => {
    const url = await getPlaylistStreamUrl(playlist)
    cast.framework.CastContext.getInstance()
      .getCurrentSession()
      .loadMedia(
        new chrome.cast.media.LoadRequest(
          new chrome.cast.media.MediaInfo(url, "audio/mp3")
        )
      )
  }, [])
}
