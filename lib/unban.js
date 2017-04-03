function unban (id) {
  if (!id) {
    throw new Error('Must specify an ID when unbanning')
  }

  if (!this.bans[id]) return
  clearTimeout(this.bans[id])
  delete this.bans[id]
  this.emit('unbanned', id)
}

module.exports = unban
