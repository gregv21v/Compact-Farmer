/**
  Item
*/
import { CompostableItem } from "./items.js"
import { Crop } from "../crops/crops.js"

export class GrassBladeItem extends CompostableItem {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position)
    this.name = "GrassBladeItem"
    this._compostValue = 7;

    this._imageURL = "images/grass.png"
    this._description = "Used in a composter to make dirt"
    this._displayName = "Grass Blade"
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
    var clone = new GrassBladeItem(this._position);
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
