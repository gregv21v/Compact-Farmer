/**
  Item
*/
import { CompostableItem } from "./items.js"


export class SpinachItem extends CompostableItem {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position)
    this.name = "SpinachItem"
   
    this._compostValue = 7;

    this._description = "Used for crafting"
    this._displayName = "Spinach"
    this._imageURL = "images/spinach2.png"
    this.updateToolTip()
  }


  /**
    clone()
    @description make a copy of this crop
  */
  clone() {
    var clone = new SpinachItem(this._position);
    clone.quantity = this.quantity;

    clone.render()
    return clone
  }


}
