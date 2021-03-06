import axios from "axios"
import { DOMParser } from "xmldom"

import { PlaylistEntry, StationInfo } from "types"

const getText = (node: Element, tag: string) =>
  node.getElementsByTagName(tag)[0].textContent

const parseStationInfo = (node: Element): StationInfo => ({
  id: node.getAttribute("id"),
  title: getText(node, "title"),
  description: getText(node, "description"),
  thumbnail: getText(node, "xlimage"),
  updated: parseInt(getText(node, "updated"), 10),
  listeners: parseInt(getText(node, "listeners"), 10),
  nowPlaying: getText(node, "lastPlaying"),
  playlist: getText(node, "fastpls"),
})

const parsePlaylistEntry = (node: Element): PlaylistEntry => ({
  title: getText(node, "title"),
  artist: getText(node, "artist"),
  album: getText(node, "album"),
  timestamp: new Date(parseInt(getText(node, "date"), 10) * 1000),
})

const compareStations = (lhs: StationInfo, rhs: StationInfo) =>
  lhs.id.localeCompare(rhs.id)

const fetchXml = async (
  resource: string,
  container: string
): Promise<Element[]> => {
  const { data } = await axios.get<string>(`https://somafm.com/${resource}`)

  const parser = new DOMParser()
  const xml = parser.parseFromString(data)
  const root = xml.getElementsByTagName(container)[0]
  return Array.from(root.childNodes)
    .filter((t) => t.constructor.name === "Element")
    .map((node) => node as Element)
}

export const fetchStations = async (): Promise<StationInfo[]> => {
  const channels = await fetchXml("channels.xml", "channels")
  return channels.map(parseStationInfo).sort(compareStations)
}

export const fetchStation = async (id: string): Promise<StationInfo> => {
  const channels = await fetchXml("channels.xml", "channels")
  const station = channels.find((node) => node.getAttribute("id") === id)
  if (!station) {
    return null
  }
  return parseStationInfo(station)
}

export const fetchPlaylist = async (
  station: string
): Promise<PlaylistEntry[]> => {
  const songs = await fetchXml(`songs/${station}.xml`, "songs")
  return songs.map(parsePlaylistEntry)
}
