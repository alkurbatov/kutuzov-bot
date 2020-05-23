const { createSystem } = require('@node-sc2/core')

const Mining = createSystem({
  name: 'Mining',

  async onUnitIdle({ resources }, idleUnit) {
    if (!idleUnit.isWorker()) return

    resources.get().actions.gather(idleUnit)
  },
})

module.exports = Mining
