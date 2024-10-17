import type { Expansion, Tag, Team } from '@/constants.ts'

export type Character = {
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

  /** ID's of other characters that need to be included if this character is included. */
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

  /** What expansion includes this character? Base game characters omit this field. */
  readonly expansion?: Expansion
  /** Attribute tags for this character. Used to allow filtering of included characters */
  readonly tags?: readonly Tag[]
}
