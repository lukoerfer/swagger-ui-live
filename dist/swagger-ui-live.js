/* global io, SwaggerUIBundle, SwaggerUIStandalonePreset */

window.onload = function () {
  const ui = SwaggerUIBundle({
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: 'StandaloneLayout'
  })

  var socket = io()
  socket.on('update', data => {
    ui.specActions.updateSpec(data)
  })
  socket.emit('ready', null)
}
