function inject (bot) {
  bot.botdown = {}
  bot.botdown.botMaker = bot.username

  bot.botdown.joinMatch = function (name) {
    bot.chat(`/match ${name} ${bot.botdown.botMaker}`)
  }

  bot.botdown.setBotMaker = function (username) {
    bot.botdown.botMaker = username
  }
}

module.exports = {
  botdown: inject
}
