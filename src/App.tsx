import { StatusBar } from "expo-status-bar"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import Home from "pages/Home"
import Station from "pages/Station"

export type RootStackParamList = {
  Home: undefined
  Station: { stationId: string }
}

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer
      linking={{
        prefixes: [],
        config: {
          screens: {
            Home: "",
            Station: "station/:stationId",
          },
        },
      }}
    >
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Station"
          component={Station}
          options={({ route }) => ({ title: route.params.stationId })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
