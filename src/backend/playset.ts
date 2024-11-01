import type { CharacterEntry, SetupPoolEntry, SetupSettings } from '@/types.ts'
import { characters } from '@/backend/data.ts'
import { CharacterValidInSetup } from '@/backend/validations.ts'
import { Required, Result } from '@/constants.ts'
import { SavableArray } from './savableArray.ts'

export class Playset {
  private readonly workingSelection = new SavableArray<CharacterEntry>()
  private readonly workingPool = new SavableArray<SetupPoolEntry>()
  private readonly workingBackupPool = new SavableArray<SetupPoolEntry>()

  get characterSelection(): readonly CharacterEntry[] {
    return this.workingSelection
  }
  get setupPool(): readonly SetupPoolEntry[] {
    return this.workingPool
  }
  get backupPool(): readonly SetupPoolEntry[] {
    return this.workingBackupPool
  }

  constructor(settings: SetupSettings) {
    // Populate the setup pools with all characters that are valid for the given setup
    for (const [id, character] of Object.entries(characters)) {
      // Perform validation checks
      const result = CharacterValidInSetup(character, settings)
      // Never include invalid characters
      if (result.status === Result.Invalid) continue

      // Include recommended characters in the pool (or everything if we're ignoring recommendations)
      // Put discouraged characters in the backup pool (if we're not enforcing recommendations)
      if (result.status === Result.Good || settings.useRecommended === Required.Never) {
        this.workingPool.push({ id, teams: [...character.teams] })
      } else if (settings.useRecommended !== Required.Always) {
        this.workingBackupPool.push({ id, teams: [...character.teams] })
      }
    }
    this.workingPool.commit()
    this.workingBackupPool.commit()
  }
}
