export const enum Expansion {
  // Start at 1 so we don't have implicit falsy values
  Necroboomicon = 1,
}

export const enum Required {
  Never,
  WhenPossible,
  Always,
}

export const enum Result {
  Good,
  Discouraged,
  Invalid,
  Duplicate,
}

export const enum Tag {
  Acting,
  CardSharePower,
  CardSwap,
  ColorSharePower,
  Contagious,
  /** Only includes conditions it is possible for the Medic to cure. */
  MedicCondition,
  Pause,
  PrivateRevealPower,
  /** Only includes the "coy", "paranoid", and "shy" conditions. */
  PsychCondition,
  PublicRevealPower,
  Verbalization,
}

export const enum Team {
  // Standard teams
  Blue,
  Red,
  // Extra teams
  Grey,
  Green,
  Unknown,
  Black,
  BlueRed,
  Seek,
}

export const enum Variant {
  Burying,
  PrivacyPromise,
}
