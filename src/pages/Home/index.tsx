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
  navigation: StackNavigationProp<RootStackParamList, "Home">
}

export default function Home(props: Props) {
  return (
    <View style={styles.container}>
      <Label>Home page</Label>
      <Button
        title="Station"
        onPress={() => props.navigation.navigate("Station")}
      />
    </View>
  )
}
