const { createSystem } = require('@node-sc2/core')
const { ORBITALCOMMAND } = require('@node-sc2/core/constants/unit-type')
const { EFFECT_CALLDOWNMULE } = require('@node-sc2/core/constants/ability')

const { EnergyCost } = require('./constants')

const Mining = createSystem({
  name: 'Mining',

  async onStep({ resources }) {
    const { units, actions } = resources.get()

    const orbitals = units
      .getById(ORBITALCOMMAND, { buildProgress: 1 })
      .filter((it) => it.energy > EnergyCost.callDownMULE)

    if (orbitals.length === 0) return

    const minerals = units.getMineralFields()

    orbitals.forEach((orbital) => {
      const [target] = units.getClosest(orbital.pos, minerals, 1)
      actions.do(EFFECT_CALLDOWNMULE, orbital, { target })
    })
  },

  async onUnitIdle({ resources }, idleUnit) {
    if (!idleUnit.isWorker()) return

    const { actions } = resources.get()
    actions.gather(idleUnit)
  },

  async onUnitFinished({ resources }, newBuilding) {
    if (!newBuilding.isGasMine()) return

    const { units, actions } = resources.get()

    const threeWorkers = units.getClosest(newBuilding.pos, units.getMineralWorkers(), 3)
    threeWorkers.forEach((worker) => worker.labels.set('gasWorker', true))

    actions.mine(threeWorkers, newBuilding)
  },
})

module.exports = Mining
