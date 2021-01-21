class MatchDoesntExistError extends Error {
  constructor (match) {
    super(`Match '${match}' does not exist!`)
    this.name = 'MatchDoesntExist'
  }
}

module.exports = MatchDoesntExistError
