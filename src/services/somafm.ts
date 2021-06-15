import axios from 'axios'
import { DOMParser } from 'xmldom'

import { ChannelType, PlaylistEntryType } from '../types'

const getText = (node: Element, tag: string) =>
  node.getElementsByTagName(tag)[0].textContent

const parseChannelInfo = (node: Element): ChannelType => ({
  id: node.getAttribute('id'),
  title: getText(node, 'title'),
  description: getText(node, 'description'),
  thumbnail: getText(node, 'xlimage'),
  updated: new Date(parseInt(getText(node, 'updated'), 10) * 1000),
  listeners: parseInt(getText(node, 'listeners'), 10),
  nowPlaying: getText(node, 'lastPlaying'),
})

const parsePlaylistEntry = (node: Element): PlaylistEntryType => ({
  title: getText(node, 'title'),
  artist: getText(node, 'artist'),
  album: getText(node, 'album'),
  timestamp: new Date(parseInt(getText(node, 'date'), 10) * 1000),
})

const compareChannels = (lhs: ChannelType, rhs: ChannelType) =>
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
    .filter((t) => t.constructor.name === 'Element')
    .map((node) => node as Element)
}

export const fetchChannels = async (): Promise<ChannelType[]> => {
  const channels = await fetchXml('channels.xml', 'channels')
  return channels.map(parseChannelInfo).sort(compareChannels)
}

export const fetchChannel = async (id: string): Promise<ChannelType | null> => {
  const channels = await fetchXml('channels.xml', 'channels')
  const channel = channels.find((node) => node.getAttribute('id') === id)
  if (!channel) {
    return null
  }
  return parseChannelInfo(channel)
}

export const fetchPlaylist = async (
  channelId: string
): Promise<PlaylistEntryType[]> => {
  const songs = await fetchXml(`songs/${channelId}.xml`, 'songs')
  return songs.map(parsePlaylistEntry)
}
