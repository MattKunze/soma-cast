import axios from "axios"
import { useCallback } from "react"

import { pickOne } from "utils"

const parsePlaylist = (lines: string[]) =>
  lines
    .filter((t) => t.startsWith("File"))
    .map((t) => t.substring(t.indexOf("=") + 1))

const getPlaylistStreamUrl = async (playlist: string): Promise<string> => {
  const { data } = await axios.get<string>(playlist)
  const urls = parsePlaylist(data.split(/\r?\n/))
  return pickOne(urls)
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
