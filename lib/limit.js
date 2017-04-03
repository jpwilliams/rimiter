function limit (id, opts) {
  if (!id) {
    throw new Error('Must specify an ID when limiting')
  }

  // does this limit even exist?
  if (!this.limits[id]) {
    this.limits[id] = {
      lastRequest: +new Date()
    }
  } else {
    clearTimeout(this.limits[id].gcTimer)
  }

  opts = opts || {}

  // set or overwrite options
  this.limits[id].rate = opts.rate || this.limits[id].rate || 10
  this.limits[id].currentAllowance = this.limits[id].rate
  this.limits[id].period = opts.period || this.limits[id].period || 5000
  this.limits[id].reqPer = this.limits[id].rate / this.limits[id].period

  this.limits[id].gcTimer = setTimeout(() => {
    delete this.limits[id]
  }, this.limits[id].period)

  // how much time has passed
  const currentTime = +new Date()
  const elapsed = currentTime - this.limits[id].lastRequest

  // overwrite lastRequest for this user
  this.limits[id].lastRequest = currentTime

  // calculate new "allowance" given the last time
  // the service was hit and how much time per req
  const newAllowance = this.limits[id].currentAllowance + (elapsed * this.limits[id].reqPer)

  // overwrite the current allowance.
  // if that's taken us over our maximum rate, push
  // it down
  this.limits[id].currentAllowance = (newAllowance > this.limits[id].rate) ? this.limits[id].rate : newAllowance

  // if we have a ticket available...
  if (this.limits[id].currentAllowance >= 1) {
    // take a ticket
    this.limits[id].currentAllowance--

    // return that they're allowed
    return true
  }

  // otherwise, DIE
  // emit disallowed
  this.emit('limited', id)

  return false
}

module.exports = limit
