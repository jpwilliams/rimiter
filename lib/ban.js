function ban (id, opts) {
  if (!id) {
    throw new Error('Must specify an ID when banning')
  }

  opts = opts || {}
  opts.time = opts.time || 60000

  if (this.bans[id]) clearTimeout(this.bans[id])
  this.bans[id] = setTimeout(this.unban.bind(this, id), opts.time)
  this.emit('banned', id)
}

module.exports = ban
