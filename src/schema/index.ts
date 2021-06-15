import { mergeTypeDefs } from "@graphql-tools/merge"
import { gql, makeExecutableSchema } from "apollo-server-micro"
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars"

import { fetchPlaylist, fetchStation, fetchStations } from "services/somafm"
import { StationInfo } from "types"

const typeDefs = gql`
  type PlaylistEntry {
    title: String
    artist: String
    album: String
    timestamp: DateTime
  }
  type Station {
    id: ID!
    title: String
    description: String
    thumbnail: String
    updated: DateTime
    listeners: Int
    nowPlaying: String
  }
  type Query {
    stations: [Station!]!
    station(id: String!): Station
    playlist(id: String!): [PlaylistEntry!]
  }
`

const resolvers = {
  Query: {
    stations: async () => {
      return await fetchStations()
    },
    station: (_parent: unknown, { id }: { id: string }) => {
      return fetchStation(id)
    },
  },
  Station: {
    updated: (parent: StationInfo) => new Date(parent.updated * 1000),
    playlist: (parent: StationInfo) => {
      return fetchPlaylist(parent.id)
    },
  },
  DateTime: DateTimeResolver,
}

export default makeExecutableSchema({
  typeDefs: mergeTypeDefs([typeDefs, DateTimeTypeDefinition]),
  resolvers,
})
