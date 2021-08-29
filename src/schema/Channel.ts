import {
  extendType,
  list,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from "nexus"

import { fetchChannel, fetchChannels, fetchPlaylist } from "../services/somafm"

export const ChannelType = objectType({
  name: "Channel",
  nonNullDefaults: {
    input: true,
    output: true,
  },
  definition(t) {
    t.id("id")
    t.string("title")
    t.string("description")
    t.string("thumbnail")
    t.field("nowPlaying", {
      type: nullable("String"),
    })
    t.int("listeners")
    t.datetime("updated")
    t.list.field("playlist", {
      type: "PlaylistEntry",
      resolve({ id }) {
        return fetchPlaylist(id)
      },
    })
  },
})

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.field("channels", {
      type: nonNull(list(nonNull(ChannelType))),
      resolve() {
        return fetchChannels()
      },
    })
    t.field("channel", {
      type: ChannelType,
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, { id }) {
        return fetchChannel(id)
      },
    })
  },
})
