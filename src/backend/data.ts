import { Tag, Team } from '@/constants.ts'
import type { Character } from '@/types.ts'

/** The ID that represents a generic member of the Blue or Red team that has no special abilities. */
export const genericCharacterId = 'generic'
/**
 * The character data for the "generic" character, which is a member of the Blue or Red team with
 * no special ability.
 */
export const genericCharacter: Character = {
  teams: [Team.Blue, Team.Red],
}

const moreThanTen = (count: number) => count > 10
const oddCount = (count: number) => count % 2 !== 0

/** A map of character data for all characters in the game. */
export const characters: Readonly<Record<string, Character>> = {
  // Basic characters
  president: {
    teams: [Team.Blue],
    substitute: 'presidentsDaughter',
    linked: ['bomber'],
  },
  bomber: {
    teams: [Team.Red],
    substitute: 'martyr',
    linked: ['president'],
  },
  gambler: {
    teams: [Team.Grey],
  },
  // Advanced characters (base game)
  agent: {
    teams: [Team.Blue, Team.Red],
    goodPlayerCount: moreThanTen,
    tags: [Tag.PrivateRevealPower, Tag.Verbalization],
  },
  agoraphobe: {
    teams: [Team.Grey],
    recommended: ['traveler'],
    discouraged: ['bouncer'],
  },
  ahab: {
    teams: [Team.Grey],
    linked: ['moby'],
    recommended: ['wife', 'mistress'],
  },
  ambassador: {
    // TODO: Flag as excluded from player count
    teams: [Team.Blue, Team.Red],
    // 11 or more players recommended
    goodPlayerCount: (count) => count >= 11,
    tags: [Tag.Condition],
  },
  anarchist: {
    teams: [Team.Grey],
    recommended: ['minion', 'mastermind'],
  },
  angel: {
    teams: [Team.Blue, Team.Red],
    recommended: ['demon'],
    tags: [Tag.Acting, Tag.Condition],
  },
  blind: {
    teams: [Team.Blue, Team.Red],
    discouraged: ['mummy'],
    tags: [Tag.Acting, Tag.Condition],
  },
  bombBot: {
    teams: [Team.Grey],
    recommended: ['queen'],
  },
  bouncer: {
    teams: [Team.Blue, Team.Red],
    validPlayerCount: oddCount,
    tags: [Tag.PrivateRevealPower, Tag.OddPlayerCount, Tag.Verbalization],
  },
  butler: {
    teams: [Team.Grey],
    linked: ['maid'],
    recommended: ['romeo', 'juliet'],
    // Recommended with 15 or more players
    goodPlayerCount: (count) => count >= 15,
  },
  clone: {
    teams: [Team.Grey],
  },
  clown: {
    teams: [Team.Blue, Team.Red],
    tags: [Tag.Acting],
  },
  conman: {
    teams: [Team.Blue, Team.Red],
    validPlayerCount: moreThanTen,
    tags: [Tag.ColorSharePower],
  },
  coyBoy: {
    teams: [Team.Blue, Team.Red],
    goodPlayerCount: moreThanTen,
    tags: [Tag.PsychCondition],
  },
  criminal: {
    teams: [Team.Blue, Team.Red],
    recommended: ['psychologist', 'engineer', 'doctor'],
    discouraged: ['privateEye', 'mastermind', 'zombie'],
    tags: [Tag.CardSharePower],
  },
  cupid: {
    teams: [Team.Red],
    recommended: ['eris'],
    tags: [Tag.PrivateRevealPower, Tag.Verbalization],
  },
  dealer: {
    teams: [Team.Blue, Team.Red],
    recommended: ['criminal'],
    tags: [Tag.CardSharePower],
  },
  decoy: {
    teams: [Team.Grey],
    linked: ['target', 'sniper'],
  },
  demon: {
    teams: [Team.Blue, Team.Red],
    recommended: ['angel'],
    tags: [Tag.Acting, Tag.Condition],
  },
  martyr: {
    teams: [Team.Red],
    recommended: ['presidentsDaughter'],
    tags: [Tag.Bury],
  },
  presidentsDaughter: {
    teams: [Team.Blue],
    recommended: ['martyr'],
    tags: [Tag.Bury],
  },
}
