module.exports = {
  // Race kutuzov-bot plays for.
  // Possible values:
  // TERRAN, ZERG, PROTOSS, RANDOM.
  // (!) Currently, only TERRAN is supported.
  race: 'TERRAN',

  // Settings of computer oppenent.
  opponent: {
    // Difficulty of a compoute opponent.
    // Possible values:
    // VERYEASY, EASY, MEDIUM, MEDIUMHARD,
    // HARD, HARDER, VERYHARD, CHEATVISION, CHEATMONEY, CHEATINSANE
    difficulty: undefined,

    // Race of the computer opponent.
    // Possible values:
    // TERRAN, ZERG, PROTOSS, RANDOM.
    race: undefined,
  },

  match: {
    map: undefined,
  },
}
