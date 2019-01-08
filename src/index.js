'use strict'

const { createAgent, createEngine, createPlayer } = require('@node-sc2/core')
const { Difficulty, Race } = require('@node-sc2/core/constants/enums');

const bot = createAgent({
    async onGameStart({ resources }) {
        const { units, actions, map } = resources.get();

        const workers = units.getWorkers();
        return actions.attackMove(workers, map.getEnemyMain().townhallPosition);
    }
})

const engine = createEngine()

engine.connect().then(() => {
    return engine.runGame('Ladder2017Season3/InterloperLE.SC2Map', [
        createPlayer({ race: Race.TERRAN }, bot),
        createPlayer({ race: Race.TERRAN, difficulty: Difficulty.MEDIUM }),
    ])
})
