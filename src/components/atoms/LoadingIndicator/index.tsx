import React from "react"
import { StyleSheet, View } from "react-native"
import { ActivityIndicator } from "react-native-paper"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

interface Props {
  large?: boolean
}
export default function LoadingIndicator(props: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating size={props.large ? "large" : undefined} />
    </View>
  )
}
