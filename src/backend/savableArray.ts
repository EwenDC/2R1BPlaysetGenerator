/** A subclass of Array that allows for committing and rolling back changes. */
export class SavableArray<T> extends Array<T> {
  private readonly committed: T[]

  /**
   * Create a new SavableArray. The initial array state is stored as the committed value.
   * @param items The items to initialize the array with.
   */
  constructor(...items: T[]) {
    super(...items)
    // Use an array constructor so the behavior is consistent with the super call
    this.committed = new Array(...items)
  }

  /** Commit the current state of the array, allowing it to be reset to this state later. */
  commit() {
    this.committed.splice(0, Infinity, ...this)
  }

  /** Revert the array to the last committed state. */
  rollback() {
    this.splice(0, Infinity, ...this.committed)
  }
}
