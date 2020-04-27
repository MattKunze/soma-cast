import React from "react"
import { Box, Image } from "@chakra-ui/core"

interface Props {
  title: string
  description: string
  imageUrl: string
}

export default (props: React.PropsWithChildren<Props>) => (
  <Box
    maxW="sm"
    borderWidth="1px"
    rounded="lg"
    overflow="hidden"
    height="100%"
    position="relative"
  >
    <Image src={props.imageUrl} alt={props.title} />
    <Box p="6">
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {props.title}
      </Box>
      <Box>
        <Box color="gray.600" fontSize="sm">
          {props.description}
        </Box>
      </Box>
      {React.Children.map(props.children, (child) => (
        <Box>{child}</Box>
      ))}
    </Box>
  </Box>
)
