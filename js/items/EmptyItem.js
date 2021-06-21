/**
  Item
*/
import { Item } from "./items.js"

export class EmptyItem extends Item {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position)
    this.name = "EmptyItem"
  }

}
