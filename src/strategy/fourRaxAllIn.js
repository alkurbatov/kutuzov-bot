const { createSystem, taskFunctions } = require('@node-sc2/core')
const { MORPH_ORBITALCOMMAND } = require('@node-sc2/core/constants/ability')
const {
  BARRACKS,
  BARRACKSTECHLAB,
  COMMANDCENTER,
  MARINE,
  REFINERY,
  SUPPLYDEPOT,
} = require('@node-sc2/core/constants/unit-type')
const { Alliance } = require('@node-sc2/core/constants/enums')
const { SHIELDWALL } = require('@node-sc2/core/constants/upgrade')

const { ability, build, upgrade } = taskFunctions

const fourRaxAllIn = createSystem({
  name: 'fourRaxAllIn',
  type: 'build',
  buildOrder: [
    [14, build(SUPPLYDEPOT)],
    [16, build(BARRACKS)],
    [17, ability(MORPH_ORBITALCOMMAND)],
    [17, build(SUPPLYDEPOT)],
    [17, build(REFINERY)],
    [17, build(COMMANDCENTER)],
    [20, build(BARRACKSTECHLAB)],
    [20, build(BARRACKS)],
    [20, build(BARRACKS)],
    [20, build(BARRACKS)],
    [22, build(SUPPLYDEPOT)],
    [22, upgrade(SHIELDWALL)],
    [25, build(SUPPLYDEPOT)],
    [27, ability(MORPH_ORBITALCOMMAND)],
    [32, build(SUPPLYDEPOT)],
  ],

  async onStep({ resources }) {
    const { units, actions } = resources.get()

    const idleBarracks = units.getById(BARRACKS, { noQueue: true, buildProgress: 1 })

    if (idleBarracks.length > 0) idleBarracks.map((barrack) => actions.train(MARINE, barrack))
  },

  async onUpgradeComplete({ resources }, technology) {
    if (technology !== SHIELDWALL) return

    const { units, map, actions } = resources.get()

    const combatUnits = units.getCombatUnits()

    const expansions = map.getExpansions(Alliance.ENEMY)
    actions.attackMove(combatUnits, expansions[0].townhallPosition, true)
    actions.attackMove(combatUnits, expansions[1].townhallPosition, true)
  },
})

module.exports = fourRaxAllIn
