import type { Expansion, Team } from '@/constants.ts'

export type Character = {
  /** Unique identifying string. */
  readonly id: string
  /** Team of the character. */
  readonly team: Team
  /** ID's of other characters that need to be included if this character is included. */
  readonly links?: readonly string[]
  /** ID's of other characters that are recommended to be included if this character is included. */
  readonly recommended?: readonly string[]
  /**
   * ID of character to also include in setup when character cards are buried, to ensure this
   * character remains in the game.
   */
  readonly substitute?: string
  /** What expansion includes this character? Base game characters omit this field. */
  readonly expansion?: Expansion
}
