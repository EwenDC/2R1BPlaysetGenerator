import { Tag, Team, Variant } from '@/constants.ts'
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
/** The maximum amount of generic "X Team" cards that can be dealt for each team. */
export const maxGenericCharacters = 7

const moreThanTen = (count: number) => count > 10
const fifteenOrMore = (count: number) => count >= 15
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
    tags: [Tag.Pause],
  },
  // Advanced characters (base game)
  agent: {
    teams: [Team.Blue, Team.Red],
    goodPlayerCount: moreThanTen,
    goodTags: [Tag.CardSharePower, Tag.PsychCondition],
    tags: [Tag.PrivateRevealPower, Tag.Verbalization],
  },
  agoraphobe: {
    teams: [Team.Grey],
    recommended: ['traveler'],
    discouraged: ['bouncer'],
  },
  ahab: {
    teams: [Team.Grey],
    linked: ['moby', 'bomber'],
    recommended: ['wife', 'mistress'],
  },
  ambassador: {
    teams: [Team.Blue, Team.Red],
    goodPlayerCount: moreThanTen,
  },
  anarchist: {
    teams: [Team.Grey],
    recommended: ['minion', 'mastermind'],
  },
  angel: {
    teams: [Team.Blue, Team.Red],
    recommended: ['demon'],
    tags: [Tag.Acting, Tag.MedicCondition],
  },
  blind: {
    teams: [Team.Blue, Team.Red],
    discouraged: ['mummy'],
    tags: [Tag.Acting, Tag.MedicCondition],
  },
  bombBot: {
    teams: [Team.Grey],
    linked: ['bomber', 'president'],
    recommended: ['queen'],
  },
  bouncer: {
    teams: [Team.Blue, Team.Red],
    validPlayerCount: oddCount,
    tags: [Tag.PrivateRevealPower, Tag.Verbalization],
  },
  butler: {
    teams: [Team.Grey],
    linked: ['maid'],
    recommended: ['romeo', 'juliet'],
    goodPlayerCount: fifteenOrMore,
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
    recommended: ['spy', 'negotiator'],
    goodPlayerCount: moreThanTen,
    tags: [Tag.PsychCondition],
  },
  criminal: {
    teams: [Team.Blue, Team.Red],
    recommended: ['psychologist', 'engineer', 'doctor'],
    discouraged: ['privateEye', 'mastermind', 'zombie'],
    tags: [Tag.CardSharePower, Tag.PsychCondition],
  },
  cupid: {
    teams: [Team.Red],
    recommended: ['eris'],
    tags: [Tag.PrivateRevealPower, Tag.Verbalization, Tag.MedicCondition],
  },
  dealer: {
    teams: [Team.Blue, Team.Red],
    recommended: ['criminal'],
    tags: [Tag.CardSharePower, Tag.MedicCondition],
  },
  decoy: {
    teams: [Team.Grey],
    linked: ['target', 'sniper'],
  },
  demon: {
    teams: [Team.Blue, Team.Red],
    recommended: ['angel'],
    tags: [Tag.Acting, Tag.MedicCondition],
  },
  doctor: {
    teams: [Team.Blue],
    substitute: 'nurse',
    linked: ['president'],
    recommended: ['engineer'],
    goodTags: [Tag.CardSharePower],
    tags: [Tag.CardSharePower],
  },
  // drBoom: {
  // TODO:
  // },
  // drunk: {
  // TODO:
  // },
  // enforcer: {
  // TODO:
  // },
  engineer: {
    teams: [Team.Red],
    substitute: 'tinkerer',
    linked: ['bomber'],
    recommended: ['doctor'],
    goodTags: [Tag.CardSharePower],
    tags: [Tag.CardSharePower],
  },
  eris: {
    teams: [Team.Blue],
    recommended: ['cupid'],
    tags: [Tag.PrivateRevealPower, Tag.Verbalization, Tag.MedicCondition],
  },
  // hotPotato: {
  // TODO:
  // },
  invincible: {
    teams: [Team.Blue, Team.Red],
    incompatible: ['zombie'],
    goodTags: [Tag.CardSharePower],
  },
  // intern: {
  // TODO:
  // },
  juliet: {
    teams: [Team.Grey],
    linked: ['romeo'],
    recommended: ['maid', 'butler'],
    goodPlayerCount: fifteenOrMore,
  },
  // leprechaun: {
  // TODO:
  // },
  maid: {
    teams: [Team.Grey],
    linked: ['butler'],
    recommended: ['romeo', 'juliet'],
    goodPlayerCount: fifteenOrMore,
  },
  martyr: {
    teams: [Team.Red],
    linked: ['bomber'],
    recommended: ['presidentsDaughter'],
    validVariants: [Variant.Burying],
  },
  mastermind: {
    teams: [Team.Grey],
    recommended: ['anarchist', 'minion'],
  },
  // mayor: {
  // TODO:
  // },
  medic: {
    teams: [Team.Blue, Team.Red],
    discouraged: ['zombie'],
    validTags: [Tag.MedicCondition],
    tags: [Tag.CardSharePower],
  },
  // mi6: {
  // TODO:
  // },
  mime: {
    teams: [Team.Blue, Team.Red],
    recommended: ['mummy'],
    tags: [Tag.Acting],
  },
  minion: {
    teams: [Team.Grey],
    recommended: ['mastermind', 'anarchist'],
  },
  mistress: {
    teams: [Team.Grey],
    linked: ['wife', 'president'],
    recommended: ['ahab', 'moby'],
  },
  moby: {
    teams: [Team.Grey],
    linked: ['ahab', 'bomber'],
    recommended: ['wife', 'mistress'],
  },
  mummy: {
    teams: [Team.Blue, Team.Red],
    recommended: ['mime', 'medic'],
    discouraged: ['blind'],
    tags: [Tag.CardSharePower],
  },
  negotiator: {
    teams: [Team.Blue, Team.Red],
    validPlayerCount: moreThanTen,
    goodTags: [Tag.CardSharePower],
    tags: [Tag.MedicCondition],
  },
  // nuclearTyrant: {
  // TODO:
  // },
  nurse: {
    teams: [Team.Blue],
    linked: ['doctor', 'president'],
    recommended: ['tinkerer'],
    validVariants: [Variant.Burying],
    tags: [Tag.CardSharePower],
  },
  // paparazzo: {
  // TODO:
  // },
  paranoid: {
    teams: [Team.Blue, Team.Red],
    recommended: ['psychologist'],
    tags: [Tag.PsychCondition, Tag.MedicCondition],
  },
  presidentsDaughter: {
    teams: [Team.Blue],
    linked: ['president'],
    recommended: ['martyr'],
    validVariants: [Variant.Burying],
  },
  privateEye: {
    teams: [Team.Grey],
    discouraged: ['criminal', 'thug'],
    // 10 players or fewer recommended
    goodPlayerCount: (count) => count <= 10,
    validVariants: [Variant.Burying],
    tags: [Tag.Pause],
  },
  psychologist: {
    teams: [Team.Blue, Team.Red],
    validTags: [Tag.PsychCondition],
    tags: [Tag.CardSharePower, Tag.PrivateRevealPower],
  },
  queen: {
    teams: [Team.Grey],
    linked: ['president', 'bomber'],
    recommended: ['bombBot'],
  },
  // rival: {
  // TODO:
  // },
  // robot: {
  // TODO:
  // },
  romeo: {
    teams: [Team.Grey],
    linked: ['juliet'],
    recommended: ['maid', 'butler'],
    goodPlayerCount: fifteenOrMore,
  },
  // security: {
  // TODO:
  // },
  shyGuy: {
    teams: [Team.Blue, Team.Red],
    recommended: ['psychologist', 'criminal'],
    tags: [Tag.PsychCondition],
  },
  sniper: {
    teams: [Team.Grey],
    linked: ['target', 'decoy'],
    badTags: [Tag.CardSwap],
    tags: [Tag.Pause],
  },
  spy: {
    teams: [Team.Blue, Team.Red],
    recommended: ['coyBoy'],
    goodPlayerCount: moreThanTen,
  },
  // survivor: {
  // TODO:
  // },
  target: {
    teams: [Team.Grey],
    linked: ['sniper', 'decoy'],
  },
  thug: {
    teams: [Team.Blue, Team.Red],
    recommended: ['psychologist', 'spy', 'engineer', 'doctor'],
    discouraged: ['privateEye'],
    goodPlayerCount: moreThanTen,
    tags: [Tag.CardSharePower, Tag.PsychCondition],
  },
  tinkerer: {
    teams: [Team.Red],
    linked: ['engineer', 'bomber'],
    recommended: ['nurse'],
    validVariants: [Variant.Burying],
    tags: [Tag.CardSharePower],
  },
  traveler: {
    teams: [Team.Grey],
    recommended: ['agoraphobe'],
  },
  // tuesdayKnight: {
  // TODO:
  // },
  usurper: {
    teams: [Team.Blue, Team.Red],
    recommended: ['mastermind', 'minion'],
    tags: [Tag.PublicRevealPower],
  },
  // victim: {
  // TODO:
  // },
  wife: {
    teams: [Team.Grey],
    linked: ['mistress', 'president'],
    recommended: ['ahab', 'moby'],
  },
  zombie: {
    teams: [Team.Green],
    incompatible: ['invincible'],
    recommended: ['doctor', 'engineer'],
    discouraged: ['medic', 'ambassador'],
    goodVariants: [Variant.PrivacyPromise],
    tags: [Tag.CardSharePower, Tag.ColorSharePower, Tag.MedicCondition, Tag.Contagious],
  },
  // Necroboomicon characters
  // TODO:
}
