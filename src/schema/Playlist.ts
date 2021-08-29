import { extendType, list, nonNull, objectType, stringArg } from "nexus"

import { fetchPlaylist } from "../services/somafm"

export const PlaylistEntryType = objectType({
  name: "PlaylistEntry",
  nonNullDefaults: {
    input: true,
    output: true,
  },
  definition(t) {
    t.string("title")
    t.string("artist")
    t.string("album")
    t.datetime("timestamp")
  },
})

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.field("playlist", {
      type: list(PlaylistEntryType),
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, { id }) {
        return fetchPlaylist(id)
      },
    })
  },
})
