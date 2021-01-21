class AlreadyInMatchError extends Error {
  constructor () {
    super('Already in a match or queue!')
    this.name = 'AlreadyInMatch'
  }
}

module.exports = AlreadyInMatchError
