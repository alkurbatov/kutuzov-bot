const { createSystem } = require('@node-sc2/core')

const Commander = createSystem({
  name: 'Commander',

  async onUnitCreated({ resources }, newUnit) {
    const { actions, map } = resources.get()

    if (newUnit.isCombatUnit()) actions.attackMove(newUnit, map.getCombatRally())
  },
})

module.exports = Commander
