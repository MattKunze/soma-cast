import React from "react"
import { Button, StyleSheet, View } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"

import { RootStackParamList } from "App"
import Label from "components/atoms/Label"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "Station">
}

export default function Station(props: Props) {
  return (
    <View style={styles.container}>
      <Label>Station details some day...</Label>
      <Button title="Back" onPress={() => props.navigation.goBack()} />
    </View>
  )
}
