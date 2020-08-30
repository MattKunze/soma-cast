import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import { RootStackParamList } from "App"
import LoadingIndicator from "components/atoms/LoadingIndicator"
import Playlist from "components/molecules/Playlist"
import StationCard from "components/molecules/StationCard"
import usePlaylist from "hooks/usePlaylist"
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
  const { status: infoStatus, data: stationInfo } = useStationInfo(stationId)
  const { status: playlistStatus, data: playlist } = usePlaylist(stationId)

  useEffect(() => {
    if (stationInfo?.title) {
      props.navigation.setOptions({ title: stationInfo.title })
    }
  }, [stationInfo?.title, props.navigation])

  return (
    <View style={styles.container}>
      {infoStatus === "loading" || playlistStatus === "loading" ? (
        <LoadingIndicator />
      ) : (
        <>
          {stationInfo && <StationCard {...stationInfo} />}
          {playlist && <Playlist playlist={playlist} />}
        </>
      )}
    </View>
  )
}
