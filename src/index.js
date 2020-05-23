'use strict'

const { createAgent, createEngine, createPlayer } = require('@node-sc2/core')
const { Difficulty, Race } = require('@node-sc2/core/constants/enums')

const { fourRaxAllIn } = require('./strategy/terran')
const Mining = require('./mining')

const bot = createAgent()
bot.use(Mining)
bot.use(fourRaxAllIn)

const engine = createEngine()

engine.connect().then(() => {
  return engine.runGame('DiscoBloodbathLE.SC2Map', [
    createPlayer({ race: Race.TERRAN }, bot),
    createPlayer({ race: Race.TERRAN, difficulty: Difficulty.EASY }),
  ])
})
