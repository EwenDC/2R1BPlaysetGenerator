import type { CharacterEntry, SetupPoolEntry, SetupSettings, ValidationResponse } from '@/types.ts'
import { characters } from '@/backend/data.ts'
import { characterValidInPool, characterValidInSetup } from '@/backend/validations.ts'
import { Required, Result, Team } from '@/constants.ts'
import { SavableArray } from './savableArray.ts'

export class Playset {
  private readonly workingSelection = new SavableArray<CharacterEntry>()
  private readonly workingPool = new SavableArray<SetupPoolEntry>()
  private readonly backupPool = new SavableArray<SetupPoolEntry>()

  get characterSelection(): readonly CharacterEntry[] {
    return this.workingSelection
  }
  get setupPool(): readonly Readonly<SetupPoolEntry>[] {
    return this.workingPool
  }

  constructor(public readonly settings: SetupSettings) {
    // Populate the setup pools with all characters that are valid for the given setup
    for (const [id, character] of Object.entries(characters)) {
      // Perform validation checks
      const result = characterValidInSetup(character, settings)
      // Never include invalid characters
      if (result.status === Result.Invalid) continue

      // Include recommended characters in the pool (or everything if we're ignoring recommendations)
      // Put discouraged characters in the backup pool (if we're not enforcing recommendations)
      if (result.status === Result.Good || settings.useRecommended === Required.Never) {
        this.workingPool.push({ id, teams: new Set(character.teams) })
      } else if (settings.useRecommended !== Required.Always) {
        this.backupPool.push({ id, teams: new Set(character.teams) })
      }
    }
    this.endTransaction(true)
  }

  /**
   * Saves or discards changes made to the selection, setup, and backup pools.
   * @param save Commits current changes if true, otherwise rolls them back.
   */
  private endTransaction(save: boolean) {
    if (save) {
      this.workingSelection.commit()
      this.workingPool.commit()
      this.backupPool.commit()
    } else {
      this.workingSelection.rollback()
      this.workingPool.rollback()
      this.backupPool.rollback()
    }
  }

  getPoolEntry(id: string) {
    return this.workingPool.find((entry) => entry.id === id)
  }

  addCharacter(id: string, teams: readonly Team[]): ValidationResponse {
    const result = this.addCharacterRecursive(id, teams, 0)
    this.endTransaction(result.status === Result.Good)
    return result
  }

  private addCharacterRecursive(
    id: string,
    teams: readonly Team[],
    depth: number,
  ): ValidationResponse {
    // Get the character data
    const character = characters[id]
    if (!character) return { status: Result.Invalid, message: 'Character not found' }

    // Find the character in the setup pool
    const poolEntry = this.getPoolEntry(id)
    if (!poolEntry) return { status: Result.Invalid, message: 'Character not in setup pool' }

    // Ensure the pool entry covers all the teams we want to add
    if (teams.some((team) => !poolEntry.teams.has(team))) {
      return {
        status: Result.Invalid,
        message: 'Character not available for one of the given teams',
      }
    }

    // Add an entry to the selection pool for each team the character is being added to
    for (const team of teams) {
      this.workingSelection.push({ id: poolEntry.id, team })
      poolEntry.teams.delete(team)
    }

    // Remove the entry from the setup pool if it has no teams left
    if (poolEntry.teams.size < 1) {
      const poolIndex = this.workingPool.findIndex((entry) => entry.id === id)
      if (poolIndex >= 0) this.workingPool.splice(poolIndex, 1)
    }

    // Add characters linked to this character
    if (character.linked) {
      for (const linkedId of character.linked) {
        // TODO: Validate
        const linkedResult = this.addCharacterRecursive(linkedId, teams, depth + 1)

        // If we can't add the linked character, then adding this character fails
        if (
          linkedResult.status !== Result.Good &&
          // Ignore discouragement unless recommendations are strictly enforced
          (linkedResult.status !== Result.Discouraged ||
            this.settings.useRecommended === Required.Always)
        ) {
          return linkedResult
        }
      }
    }

    return { status: Result.Good }
  }

  /**
   * Expands the setup pool to include characters that were initially excluded due to being
   * discouraged, either due to the setup settings or a character that was included.
   * @returns Whether the setup pool was expanded successfully. False means there are no more
   * characters that can be included in this setup.
   */
  expandSetupPool() {
    // If the backup pool is empty then it's no longer possible to expand the setup pool
    if (this.backupPool.length <= 0) return false

    // Expand the setup pool by including the backup pool
    this.workingPool.push(...this.backupPool)
    // Clear the backup pool so we don't try to include the contained characters twice
    this.backupPool.length = 0

    // Commit changes and return a successful response
    this.endTransaction(true)
    return true
  }
}
