import React from "react"
import { Button, StyleSheet, View } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import { RootStackParamList } from "App"
import LoadingIndicator from "components/atoms/LoadingIndicator"
import StationCard from "components/molecules/StationCard"
import useStationInfo from "hooks/useStationInfo"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
})

interface Props {
  route: RouteProp<RootStackParamList, "Station">
  navigation: StackNavigationProp<RootStackParamList, "Station">
}

export default function Station(props: Props) {
  const { stationId } = props.route.params
  const { status, data } = useStationInfo(stationId)

  return (
    <View style={styles.container}>
      {status === "loading" ? (
        <LoadingIndicator />
      ) : data ? (
        <StationCard {...data} />
      ) : null}
    </View>
  )
}
