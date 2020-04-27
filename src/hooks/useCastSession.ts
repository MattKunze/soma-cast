import { useCallback, useEffect, useState } from "react"
import {
  CastState,
  CastContextEventType,
  SessionEventType,
} from "chromecast-caf-receiver/cast.framework"

import { isServer } from "utils"

const getCastInstance = () =>
  isServer() ? undefined : window.cast?.framework.CastContext.getInstance()

const getCastSession = () => {
  const instance = getCastInstance()
  if (instance?.getCastState() === "CONNECTED") {
    return instance.getCurrentSession()
  }
}

export interface SessionInterface {
  castState?: CastState
  sessionId?: string
  contentId?: string
  volume?: number
  isMuted?: boolean
  setVolume: (volume: number) => void
  toggleMute: () => void
  stop: () => void
}

export default (): SessionInterface => {
  const setVolume = useCallback((volume: number) => {
    getCastSession().setVolume(volume / 100)
  }, [])
  const toggleMute = useCallback(() => {
    const session = getCastSession()
    session.setMute(!session.isMute())
    setTimeout(handleChange, 100)
  }, [])
  const stop = useCallback(() => {
    new cast.framework.RemotePlayerController(
      new cast.framework.RemotePlayer()
    ).stop()
    setTimeout(handleChange, 100)
  }, [])

  const getCurrentInterface = (): SessionInterface => {
    const instance = getCastInstance()
    const session = getCastSession()

    return {
      castState: instance?.getCastState(),
      sessionId: session?.getSessionId(),
      contentId: session?.getMediaSession()?.media.contentId,
      volume: session ? Math.floor(session.getVolume() * 100) : undefined,
      isMuted: session?.isMute(),
      setVolume,
      toggleMute,
      stop,
    }
  }

  const [sessionInterface, setSessionInterface] = useState(
    getCurrentInterface()
  )

  const handleChange = useCallback(() => {
    setSessionInterface(getCurrentInterface())
  }, [])

  const instance = getCastInstance()
  useEffect(() => {
    if (instance) {
      instance.addEventListener(
        "caststatechanged" as CastContextEventType.CAST_STATE_CHANGED,
        handleChange
      )

      return () => {
        instance.removeEventListener(
          "caststatechanged" as CastContextEventType.CAST_STATE_CHANGED,
          handleChange
        )
      }
    } else {
      // if cast interface isn't available wait a bit and retry
      setTimeout(handleChange, 100)
    }
  }, [instance])

  const session = getCastSession()
  useEffect(() => {
    if (session) {
      session.addEventListener(
        "mediasession" as SessionEventType.MEDIA_SESSION,
        handleChange
      )
      session.addEventListener(
        "volumechanged" as SessionEventType.VOLUME_CHANGED,
        handleChange
      )

      return () => {
        session.removeEventListener(
          "mediasession" as SessionEventType.MEDIA_SESSION,
          handleChange
        )
        session.removeEventListener(
          "volumechanged" as SessionEventType.VOLUME_CHANGED,
          handleChange
        )
      }
    }
  }, [session])

  return sessionInterface
}
