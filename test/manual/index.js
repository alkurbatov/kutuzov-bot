const config = require('config')
const { createAgent, createEngine } = require('@node-sc2/core')
const { PlayerType, Race } = require('@node-sc2/core/constants/enums')
const createBot = require('../../src/bot')

const bot = createBot()

const human = createAgent({
  settings: {
    type: PlayerType.PARTICIPANT,
    race: Race[config.opponent.race],
  },
})

const host = createEngine({ port: 5555 })
host.connect().then(async () => {
  console.log('Hosting a game...')
  await host.createGame(config.match.map, [human.settings, bot.settings], true)
  console.log('Game created!')

  console.log('Joining as human player...')
  await host.joinGame(human, {
    sharedPort: 5680,
    serverPorts: {
      gamePort: 5681,
      basePort: 5682,
    },
    clientPorts: [
      {
        gamePort: 5683,
        basePort: 5684,
      },
      {
        gamePort: 5685,
        basePort: 5686,
      },
    ],
  })

  console.log('Human player ready!')
})

const client = createEngine({ port: 5556 })
client.connect().then(async () => {
  console.log('Joining as bot player...')
  await client.joinGame(bot, {
    sharedPort: 5680,
    serverPorts: {
      gamePort: 5683,
      basePort: 5684,
    },
    clientPorts: [
      {
        gamePort: 5683,
        basePort: 5684,
      },
      {
        gamePort: 5685,
        basePort: 5686,
      },
      {
        gamePort: 5687,
        basePort: 5688,
      },
    ],
  })

  console.log('Bot player ready!')
  client.runLoop()
})
