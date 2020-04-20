import React from "react"
import { CSSReset, ThemeProvider } from "@chakra-ui/core"
import { AppProps } from "next/app"
import { SWRConfig } from "swr"

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    console.error({ error })
    return { hasError: true }
  }

  public render() {
    if (this.state.hasError) {
      return <div>something went deeply wrong...</div>
    } else {
      return this.props.children
    }
  }
}

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (input: RequestInfo, init?: RequestInit) =>
          fetch(input, init).then((res) => res.json()),
      }}
    >
      <ErrorBoundary>
        <ThemeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ThemeProvider>
      </ErrorBoundary>
    </SWRConfig>
  )
}

export default App
