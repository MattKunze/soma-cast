const script = window.document.createElement("script")
script.src =
  "//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"
document.head.appendChild(script)

// why does this need to be executed asynchronously? good question, but it
// doesn't work if we immediately initialize. sigh...
setTimeout(() => {
  const options = new cast.framework.CastReceiverOptions()
  options.disableIdleTimeout = true
  options.customNamespaces = {
    "urn:x-cast:soma-cast": cast.framework.system.MessageType.JSON,
  }
  cast.framework.CastReceiverContext.getInstance().start(options)
}, 1000)
