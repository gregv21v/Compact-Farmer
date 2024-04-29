/**
  DirtBlockItem
*/
import { CompostableItem } from "./items.js"

export class DirtBlockItem extends CompostableItem {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position)
    this.name = "DirtBlockItem"
    this._elements = {
      Phospherous: 20,
      Carbon: 10,
      Iron: 20
    }
    this._compostValue = 50
    this._imageURL = "images/dirtBlock.png"
    this._description = "Placable on the plus marks"
    this._displayName = "Dirt Block"
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
    var clone = new DirtBlockItem(this._position);
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
