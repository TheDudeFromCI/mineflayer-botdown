import events from 'events'
import AlreadyInMatchError from './src/AlreadyInMatchError'
import MatchDoesntExistError from './src/MatchDoesntExistError'

async function awaitFailEvent (event, bot, error) {
  await events.once(event, bot)
  throw error
}

function inject (bot) {
  bot.botdown = {}
  bot.botdown.botMaker = bot.username

  // en_US events
  bot.addChatPattern(/^The .* match has begun! Good luck!$/, 'join_match', 'BotDown join_match en_US')
  bot.addChatPattern(/^There is no minigame with the name '.*'!$/, 'match_doesnt_exist', 'BotDown match_doesnt_exist en_US')
  bot.addChatPattern(/^You are already in a match or queue!$/, 'already_in_match', 'BotDown already_in_match en_US')

  bot.botdown.joinMatch = async function (matchName) {
    bot.chat(`/match ${matchName} ${bot.botdown.botMaker}`)

    await Promise.race([
      events.once('join_match', bot),
      awaitFailEvent('match_doesnt_exist', bot, new MatchDoesntExistError(matchName)),
      awaitFailEvent('already_in_match', bot, new AlreadyInMatchError())
    ])
  }

  bot.botdown.setBotMaker = function (username) {
    bot.botdown.botMaker = username
  }
}

module.exports = {
  botdown: inject
}
