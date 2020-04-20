import React, { ReactElement, Suspense } from "react"
import useSWR from "swr"

import { isServer } from "utils"

type RenderCallback<T> = (data: T) => ReactElement

function Container<T>({
  endpoint,
  renderFn,
}: {
  endpoint: string
  renderFn: RenderCallback<T>
}) {
  const { data } = useSWR<T>(endpoint, undefined, {
    suspense: true,
  })
  return renderFn(data)
}

interface Props<T> {
  fallback: ReactElement
  endpoint: string
  children: RenderCallback<T>
}

function SuspenseContainer<T>(props: Props<T>) {
  if (isServer()) {
    return props.fallback
  } else {
    return (
      <Suspense fallback={props.fallback}>
        <Container<T> endpoint={props.endpoint} renderFn={props.children} />
      </Suspense>
    )
  }
}

export default SuspenseContainer
