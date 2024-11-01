import { createSignal, type Accessor, type Setter, createMemo } from 'solid-js'

export class SavableArray<T> {
  private readonly committedItems: Accessor<T[]>
  private readonly setCommittedItems: Setter<T[]>

  private readonly addedItems: Accessor<T[]>
  private readonly setAddedItems: Setter<T[]>

  private readonly removedItems: T[] = []

  readonly read: Accessor<readonly T[]>

  constructor(initialItems: T[] = []) {
    const [committedItems, setCommittedItems] = createSignal(initialItems)
    this.committedItems = committedItems
    this.setCommittedItems = setCommittedItems

    const [addedItems, setAddedItems] = createSignal<T[]>([])
    this.addedItems = addedItems
    this.setAddedItems = setAddedItems

    this.read = createMemo(() => [...committedItems(), ...addedItems()])
  }

  add(item: T) {
    this.setAddedItems((items) => [...items, item])
  }

  remove(index: number) {
    const committedLength = this.committedItems().length
    // Does the provided index fall within the committed items list?
    if (index < committedLength) {
      // Remove the item from the committed list, but keep a backup of it in the removed list
      let removedItem: T | undefined
      this.setCommittedItems((items) => {
        removedItem = items.splice(index, 1)[0]
        return items
      })
      if (removedItem) this.removedItems.push(removedItem)
    } else {
      // Remove the item from the added list
      this.setAddedItems((items) => {
        // Adjust the index so it's relative to the added items list
        items.splice(index - committedLength, 1)
        return items
      })
    }
  }

  commit() {
    const addedItems = this.addedItems()
    if (addedItems.length > 0) {
      this.setCommittedItems((items) => [...items, ...addedItems])
      this.setAddedItems([])
    }
    // I have yet to decide if JavaScript supporting length assignment is horrifying or genius
    this.removedItems.length = 0
  }

  rollback() {
    if (this.removedItems.length > 0) {
      this.setCommittedItems((items) => [...items, ...this.removedItems])
      this.removedItems.length = 0
    }
    if (this.addedItems().length > 0) this.setAddedItems([])
  }
}
