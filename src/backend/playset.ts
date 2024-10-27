import type { CharacterList, SetupPool, SetupSettings } from '@/types.ts'
import { characters } from '@/backend/data.ts'
import { CharacterValidInSetup } from '@/backend/validations.ts'
import { Required, Result } from '@/constants.ts'

export class Playset {
  private confirmedSelection: CharacterList = []
  private confirmedPool: SetupPool = []
  private confirmedBackupPool: SetupPool = []

  private workingSelection: CharacterList = []
  private workingPool: SetupPool = []
  private workingBackupPool: SetupPool = []

  get characterSelection(): CharacterList {
    return [...this.confirmedSelection, ...this.workingSelection]
  }
  get setupPool(): SetupPool {
    return [...this.confirmedPool, ...this.workingPool]
  }
  get backupPool(): SetupPool {
    return [...this.confirmedBackupPool, ...this.workingBackupPool]
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
        this.confirmedPool.push({ id, teams: [...character.teams] })
      } else if (settings.useRecommended !== Required.Always) {
        this.confirmedBackupPool.push({ id, teams: [...character.teams] })
      }
    }
  }
}
