import React from "react"
import { Text } from "react-native"

interface Props {
  children: string
}

export default function Label(props: Props) {
  return <Text>{props.children}</Text>
}
