const config = require('config')
const { createEngine, createPlayer } = require('@node-sc2/core')
const { Difficulty, Race } = require('@node-sc2/core/constants/enums')
const createBot = require('./bot')

const bot = createBot()

const engine = createEngine()
engine
  .connect()
  .then(() =>
    engine.runGame(config.match.map, [
      createPlayer(bot.settings, bot),
      createPlayer({ race: Race[config.opponent.race], difficulty: Difficulty[config.opponent.difficulty] }),
    ])
  )
