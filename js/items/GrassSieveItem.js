/**
  Item
*/
import { SieveItem } from "./SieveItem.js"

export class GrassSieveItem extends SieveItem {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position)
    this.name = "GrassSieveItem"

    this._imageURL = "images/grassSieve.png"
    this._description = "Used to collect seeds from water"
    this._displayName = "Grass Sieve"
    this._compostValue = 28;
    this.updateToolTip()
  }




  /**
    setPosition()
    @description sets the position of this item
    @param position the new position of this item
  */
  set position(position) {
    super.position = position;
  }

  /**
    get position
    @description gets the position of the item
  */
  get position() {
    return super.position;
  }

  /**
    clone()
    @description make a copy of this crop
  */
  clone() {
    var clone = new GrassSieveItem(this._position);
    clone.quantity = this.quantity;

    clone.render()
    return clone
  }

  /**
    onClick()
    @description the function called when this block is clicked
  */
  onClick() {
    // do something ...
    console.log(this.name);
  }
}
