const config = require('config')
const { createAgent } = require('@node-sc2/core')
const { PlayerType, Race } = require('@node-sc2/core/constants/enums')
const { fourRaxAllIn } = require('./strategy')
const Commander = require('./commander')
const Mining = require('./mining')

function createBot() {
  const bot = createAgent({
    settings: {
      type: PlayerType.PARTICIPANT,
      race: Race[config.race],
    },
  })

  bot.use(Commander)
  bot.use(Mining)
  bot.use(fourRaxAllIn)

  return bot
}

module.exports = createBot
