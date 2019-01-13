'use strict'

const { createSystem, taskFunctions } = require('@node-sc2/core')
const {
    BARRACKS,
    MARINE,
    SUPPLYDEPOT,
} = require('@node-sc2/core/constants/unit-type')
const { MORPH_ORBITALCOMMAND } = require('@node-sc2/core/constants/ability')

const { ability, build } = taskFunctions;

const fourRaxAllIn = createSystem({
    name: 'fourRaxAllIn',
    type: 'build',
    buildOrder: [
        [13, build(SUPPLYDEPOT)],
        [13, build(BARRACKS)],
        [16, build(SUPPLYDEPOT)],
        [16, build(BARRACKS)],
        [16, ability(MORPH_ORBITALCOMMAND)],
        [16, build(BARRACKS)],
        [16, build(BARRACKS)],
        [16, build(SUPPLYDEPOT)],
        [16, build(SUPPLYDEPOT)],
    ],

    async onUnitFinished({ resources }, newUnit) {
        if (!newUnit.is(BARRACKS))
            return

        // FIXME (alkurbatov): Set rally point on the nearest ramp.
        resources.get().actions.train(MARINE, newUnit)
    },

    async onUnitIdle({ resources }, idleUnit) {
        if (!idleUnit.is(BARRACKS))
            return

        resources.get().actions.train(MARINE, idleUnit)
    }
})

module.exports = fourRaxAllIn
