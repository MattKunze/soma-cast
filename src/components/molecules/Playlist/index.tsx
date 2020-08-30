import React from "react"
import { StyleSheet, View } from "react-native"
import { Chip, DataTable } from "react-native-paper"

import { PlaylistEntry } from "types"

const styles = StyleSheet.create({
  timestamp: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexGrow: 0,
    flexBasis: 125,
  },
})

interface Props {
  playlist: PlaylistEntry[]
}

export default function Playlist(props: Props) {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={styles.timestamp}>&nbsp;</DataTable.Title>
        <DataTable.Title>Title</DataTable.Title>
        <DataTable.Title>Artist</DataTable.Title>
        <DataTable.Title>Album</DataTable.Title>
      </DataTable.Header>
      {props.playlist.map((entry) => (
        <DataTable.Row key={entry.timestamp.getTime()}>
          <View style={styles.timestamp}>
            <Chip mode="outlined">{entry.timestamp.toLocaleTimeString()}</Chip>
          </View>
          <DataTable.Cell>{entry.title}</DataTable.Cell>
          <DataTable.Cell>{entry.artist}</DataTable.Cell>
          <DataTable.Cell>{entry.album}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  )
}
