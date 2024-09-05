onmessage = function (event) {
  console.log('Event', event)

  const result = event.data * 2

  this.postMessage(result)
}
