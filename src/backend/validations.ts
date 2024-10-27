import type { Character, CharacterList, SetupSettings, ValidationResponse } from '@/types.ts'
import { characters } from '@/backend/data.ts'
import { Result, Team } from '@/constants.ts'

/**
 * Checks if a character is valid to include in the initial setup pool.
 * @param character The data of the character to validate.
 * @param settings The setup settings to validate against.
 * @returns The validation result. "Good" means the character can be freely included, "Discouraged"
 * means the character is not recommended to be included but can be, and "Invalid" means the
 * character can not be included no matter what.
 */
export function CharacterValidInSetup(
  character: Character,
  settings: SetupSettings,
): ValidationResponse {
  //
  // **Mandatory requirements**
  //

  // Check if the character comes from an included expansion
  if (character.expansion && !settings.expansions.includes(character.expansion)) {
    return { status: Result.Invalid, message: 'Character expansion not included' }
  }

  // Check if the character is compatible with the current player count
  if (character.validPlayerCount && !character.validPlayerCount(settings.playerCount)) {
    return { status: Result.Invalid, message: 'Character not compatible with this player count' }
  }

  // Check if the character is compatible with the selected variants
  if (character.validVariants?.some((variant) => !settings.variants.includes(variant))) {
    return { status: Result.Invalid, message: 'Character not compatible with selected variants' }
  }

  // Check if the character has any excluded tags
  if (character.tags?.some((tag) => settings.excludedTags.includes(tag))) {
    return { status: Result.Invalid, message: 'Character has excluded tags' }
  }

  //
  // **Recommended requirements**
  //

  // Check if the character is recommended at the given player count
  if (character.goodPlayerCount && !character.goodPlayerCount(settings.playerCount)) {
    return {
      status: Result.Discouraged,
      message: 'Character not recommended at this player count',
    }
  }

  // Check if the character is recommended with the selected variants
  if (
    character.goodVariants &&
    !character.goodVariants.every((variant) => settings.variants.includes(variant))
  ) {
    return {
      status: Result.Discouraged,
      message: 'Character not recommended with selected variants',
    }
  }

  return { status: Result.Good }
}

/**
 * Checks if a character is valid to include in an existing list of included characters.
 * @param characterId The ID of the character to validate.
 * @param characterTeams Which teams the validated character is being added to.
 * @param existingList The list of characters to validate against.
 * @returns The validation result. "Good" means the character can be freely included, "Discouraged"
 * means the character is not recommended to be included but can be, "Invalid" means the character
 * can not be included no matter what, and "Duplicate" means the character is already in the pool.
 */
export function CharacterValidInPool(
  characterId: string,
  characterTeams: readonly Team[],
  existingList: CharacterList,
): ValidationResponse {
  // First lookup the character data
  const character = characters[characterId]
  if (!character) return { status: Result.Invalid, message: 'Character data not found' }

  let response: ValidationResponse = { status: Result.Good }

  // Check the new character against all existing characters in the pool
  for (const poolEntry of existingList) {
    //
    // **Mandatory requirements**
    //

    // Check that the character is not already in the pool
    if (poolEntry.id === characterId && characterTeams.includes(poolEntry.team)) {
      return { status: Result.Duplicate }
    }

    // Check if the new character is compatible with the existing character
    if (character.incompatible?.includes(poolEntry.id)) {
      return {
        status: Result.Invalid,
        message: 'Character incompatible with existing character',
        otherId: poolEntry.id,
      }
    }

    // For checks that require character data. If we (somehow) don't find it, we'll just skip them
    const existingCharacter = characters[poolEntry.id]

    // Check if the existing character is compatible with the new character
    if (existingCharacter?.incompatible?.includes(characterId)) {
      return {
        status: Result.Invalid,
        message: 'Existing character incompatible with character',
        otherId: poolEntry.id,
      }
    }

    //
    // **Recommended requirements**
    //

    // Don't bother checking if we already know the character is not recommended
    if (response.status !== Result.Good) continue

    // For these don't return early, as we want to check all characters in the pool are valid

    // Check if the new character is compatible with the existing character
    if (character.discouraged?.includes(poolEntry.id)) {
      response = {
        status: Result.Discouraged,
        message: 'Character not recommended with existing character',
        otherId: poolEntry.id,
      }
      continue
    }

    if (existingCharacter) {
      // Check if the existing character is compatible with the new character
      if (existingCharacter.discouraged?.includes(characterId)) {
        response = {
          status: Result.Discouraged,
          message: 'Existing character not recommended with character',
          otherId: poolEntry.id,
        }
        continue
      }

      // Check if the new character is not recommended with the existing character's tags
      if (
        existingCharacter.tags &&
        character.badTags?.some((tag) => existingCharacter.tags?.includes(tag))
      ) {
        response = {
          status: Result.Discouraged,
          message: 'Character not recommended with existing character',
          otherId: poolEntry.id,
        }
        continue
      }

      // Check if the existing character is not recommended with the new character's tags
      if (
        character.tags &&
        existingCharacter.badTags?.some((tag) => character.tags?.includes(tag))
      ) {
        response = {
          status: Result.Discouraged,
          message: 'Existing character not recommended with character',
          otherId: poolEntry.id,
        }
        continue
      }
    }
  }

  return response
}
