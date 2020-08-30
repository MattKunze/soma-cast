import React from "react"
import { StyleSheet } from "react-native"
import { Card } from "react-native-paper"

import { StationInfo } from "types"

const styles = StyleSheet.create({
  card: {
    width: "100%",
  },
})

interface Props extends StationInfo {
  onSelect?: () => void
}

export default function StationCard(props: Props) {
  return (
    <Card elevation={2} style={styles.card} onPress={props.onSelect}>
      <Card.Cover source={{ uri: props.thumbnail }} />
      <Card.Title title={props.title} subtitle={props.description} />
    </Card>
  )
}
