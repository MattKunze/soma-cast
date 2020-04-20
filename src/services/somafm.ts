import axios from "axios"
import { DOMParser } from "xmldom"

import { StationInfo, StationDetails } from "types"
import { pickOne } from "utils"

const getText = (node: Element, tag: string) =>
  node.getElementsByTagName(tag)[0].textContent

const parseStationInfo = (node: Element): StationInfo => ({
  id: node.getAttribute("id"),
  title: getText(node, "title"),
  description: getText(node, "description"),
  thumbnail: getText(node, "xlimage"),
  updated: parseInt(getText(node, "updated"), 10),
  listeners: parseInt(getText(node, "listeners"), 10),
})

const compareStations = (lhs: StationInfo, rhs: StationInfo) =>
  lhs.id.localeCompare(rhs.id)

const fetchChannels = async (): Promise<Element[]> => {
  const { data } = await axios.get<string>("https://somafm.com/channels.xml")

  const parser = new DOMParser()
  const xml = parser.parseFromString(data)
  return Array.from(
    xml.getElementsByTagName("channels")[0].getElementsByTagName("channel")
  )
}

const parsePlaylist = (lines: string[]) =>
  lines
    .filter((t) => t.startsWith("File"))
    .map((t) => t.substring(t.indexOf("=") + 1))

export const fetchStations = async (): Promise<StationInfo[]> => {
  const channels = await fetchChannels()
  return channels.map(parseStationInfo).sort(compareStations)
}

export const fetchDetails = async (id: string): Promise<StationDetails> => {
  const channels = await fetchChannels()
  const station = channels.find((node) => node.getAttribute("id") === id)
  if (!station) {
    return null
  }
  const info = parseStationInfo(station)

  const playlist = getText(station, "fastpls")
  const { data } = await axios.get<string>(playlist)
  const urls = parsePlaylist(data.split(/\r?\n/))

  return {
    ...info,
    playlist,
    streamUrl: pickOne(urls),
  }
}
