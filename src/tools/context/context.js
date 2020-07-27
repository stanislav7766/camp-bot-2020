function Context() {
  this.events = {}
  this.ctx = {
    status: '',
    command: '',
    keyboard: '',
    papyrus: '',
    msgFile: {
      receiverMsg: '',
      msg: '',
      file: null,
    },
    typedPoints: '',
    meetupProp: '',
    meetup: {},
  }
}

Context.prototype.clearContext = function () {
  Object.keys(this.ctx).forEach(key => (this.ctx[key] = ''))
}
Context.prototype.getStatus = function () {
  return this.ctx.status
}

Context.prototype.on = function (eventName, listener) {
  const event = this.events[eventName]
  event ? event.push(listener) : (this.events[eventName] = [listener])
}
Context.prototype.emit = function (eventName, ...data) {
  const event = this.events[eventName]
  event && event.forEach(listener => listener(...data))
}
Context.prototype.setContext = function (obj) {
  this.ctx = { ...this.getContext(), ...obj }
}
Context.prototype.getContext = function () {
  return this.ctx
}

const context = new Context()

context.on('changeContext', data => context.setContext(data))

export { context }
