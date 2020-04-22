const isChromecast = () => window.location.pathname.startsWith("/receiver")

const initializeCastApi = () => {
  const applicationId = "FF04667C"
  cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId: applicationId,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
  })
}
window["__onGCastApiAvailable"] = (isAvailable) => {
  if (isAvailable && !isChromecast()) {
    initializeCastApi()
  }
}

if (!isChromecast()) {
  const script = window.document.createElement("script")
  script.src =
    "//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"
  document.head.appendChild(script)
}
