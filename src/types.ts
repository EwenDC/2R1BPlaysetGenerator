import type { Expansion, Required, Result, Tag, Team, Variant } from '@/constants.ts'

export interface Character {
  /**
   * Teams that include this character. If multiple teams are specified, there is one copy of this
   * character for each team.
   */
  readonly teams: readonly Team[]
  /**
   * ID of character to also include in setup when character cards are buried, to ensure this
   * character remains in the game.
   */
  readonly substitute?: string
  /** ID's of other characters that must to be included if this character is included. */
  readonly linked?: readonly string[]
  /** ID's of other characters that cannot be included if this character is included. */
  readonly incompatible?: readonly string[]
  /** ID's of other characters that are recommended to be included if this character is included. */
  readonly recommended?: readonly string[]
  /** ID's of other characters that are recommended not to be included if this character is included. */
  readonly discouraged?: readonly string[]
  /**
   * Function for checking if this character is supported at the given player count.
   * @param count The number of players in the game.
   * @returns Whether this character can be included at the given player count.
   */
  readonly validPlayerCount?: (count: number) => boolean
  /**
   * Function for checking if this character is recommended at the given player count (as per
   * official character guides).
   * @param count The number of players in the game.
   * @returns Whether this character is recommended at the given player count.
   */
  readonly goodPlayerCount?: (count: number) => boolean
  /**
   * At least one other character with each of these tags must be included if this character is to
   * be included.
   */
  readonly validTags?: readonly Tag[]
  /**
   * Characters with these tags are recommended to be included if this character is included. Will
   * only be checked against characters not already explicitly linked to this character via the
   * `linked` or `recommended` fields.
   */
  readonly goodTags?: readonly Tag[]
  /** Characters with these tags are not recommended to be included if this character is included. */
  readonly badTags?: readonly Tag[]
  /** Rule variants that must be used to include this character. */
  readonly validVariants?: readonly Variant[]
  /** Rule variants that are recommended to be used when including this character. */
  readonly goodVariants?: readonly Variant[]
  /** What expansion includes this character? Base game characters omit this field. */
  readonly expansion?: Expansion
  /** Attribute tags for this character. Used to allow filtering of included characters. */
  readonly tags?: readonly Tag[]
}

export interface CharacterEntry {
  readonly id: string
  readonly team: Team
}

export interface SetupPoolEntry {
  readonly id: string
  teams: Set<Team>
}

export interface SetupSettings {
  readonly playerCount: number
  readonly expansions: readonly Expansion[]
  readonly variants: readonly Variant[]
  readonly useRecommended: Required
  readonly excludedTags: readonly Tag[]
}

export type ValidationResponse =
  | {
      readonly status: Result.Good | Result.Duplicate
      readonly message?: never
      readonly otherId?: never
    }
  | {
      readonly status: Result.Discouraged | Result.Invalid
      readonly message: string
      readonly otherId?: string
    }
