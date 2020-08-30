import React from "react"
import {
  FlatList,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native"
import { Link, useLinkTo } from "@react-navigation/native"
import { Paragraph } from "react-native-paper"

import LoadingIndicator from "components/atoms/LoadingIndicator"
import StationCard from "components/molecules/StationCard"
import useStationList from "hooks/useStationList"

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: 0,
    margin: 16,
  },
})

interface Props {
  selectStation: (stationId: string) => void
}

export default function StationList(props: Props) {
  const linkTo = useLinkTo()
  const { status, data } = useStationList()
  const dimensions = useWindowDimensions()
  const numColumns = Math.max(1, Math.floor(dimensions.width / 480))

  return status === "loading" ? (
    <LoadingIndicator large />
  ) : status === "error" ? (
    <Paragraph>Failed to load stations</Paragraph>
  ) : (
    <FlatList
      key={numColumns}
      data={data}
      numColumns={numColumns}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {Platform.OS === "web" ? (
            <Link to={`/station/${item.id}`}>
              <StationCard {...item} />
            </Link>
          ) : (
            <StationCard
              {...item}
              onSelect={() => linkTo(`/station/${item.id}`)}
            />
          )}
        </View>
      )}
    />
  )
}
