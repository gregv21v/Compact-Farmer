/**
  CompostableItem - an item that is compostable
*/
import { Item } from "./Item.js"

export class CompostableItem extends Item {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position);
    this._compostValue = 0; // the amount of compost this item will produce.
  }


  /**
   * get compostValue()
   * @description get the compost value of this item
   */
  get compostValue() {
    return this._compostValue;
  }
}
