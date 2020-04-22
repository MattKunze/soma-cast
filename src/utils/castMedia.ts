export default (url: string, contentType: string = "audio/mp3") => {
  cast.framework.CastContext.getInstance()
    .getCurrentSession()
    .loadMedia(
      new chrome.cast.media.LoadRequest(
        new chrome.cast.media.MediaInfo(url, contentType)
      )
    )
}
