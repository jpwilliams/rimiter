const microloader = require('microloader')
const path = require('path')
require('util').inherits(require('events').EventEmitter, Rimiter)

function Rimiter (opts) {
  opts = opts || {}
  this.limits = {}
  this.bans = {}

  return this
}

// loads in all files in lib as prototype functions
const funcs = microloader('./lib', {
  objectify: true,
  absolute: false,
  keepExtension: false,
  cwd: path.dirname(__filename)
})

Object.keys(funcs.lib).forEach((key) => {
  Rimiter.prototype[key] = funcs.lib[key]
})

module.exports = Rimiter
