import React, { ReactNode } from "react"
import { StyleSheet, View } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
})

interface Props {
  children: ReactNode
}
export default function Default(props: Props) {
  return <View style={styles.container}>{props.children}</View>
}
