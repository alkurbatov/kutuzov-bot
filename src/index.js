const config = require('config')
const { createAgent, createEngine, createPlayer } = require('@node-sc2/core')
const { Difficulty, Race } = require('@node-sc2/core/constants/enums')

const { fourRaxAllIn } = require('./strategy')
const Commander = require('./commander')
const Mining = require('./mining')

const bot = createAgent()
bot.use(Commander)
bot.use(Mining)
bot.use(fourRaxAllIn)

const engine = createEngine()

engine
  .connect()
  .then(() =>
    engine.runGame(config.match.map, [
      createPlayer({ race: Race[config.race] }, bot),
      createPlayer({ race: Race[config.opponent.race], difficulty: Difficulty[config.opponent.difficulty] }),
    ])
  )
