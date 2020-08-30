import React from "react"
import { StackNavigationProp } from "@react-navigation/stack"

import { RootStackParamList } from "App"
import StationList from "components/organisms/StationList"
import Default from "components/templates/Default"

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "Home">
}

export default function Home(props: Props) {
  return (
    <Default>
      <StationList
        selectStation={(stationId) =>
          props.navigation.navigate("Station", { stationId })
        }
      />
    </Default>
  )
}
