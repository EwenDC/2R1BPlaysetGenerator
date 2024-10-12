import { Team } from '@/constants.ts'
import type { Character } from '@/types.ts'

export const president: Character = {
  id: 'president',
  team: Team.Blue,
  links: ['bomber'],
  substitute: 'daughter',
}

export const bomber: Character = {
  id: 'bomber',
  team: Team.Red,
  links: ['president'],
  substitute: 'martyr',
}

export const generic: Character = {
  id: 'generic',
  team: Team.Both,
}
