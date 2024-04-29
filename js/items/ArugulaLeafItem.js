/**
  Item
*/
import { CompostableItem } from "./items.js"


export class ArugulaLeafItem extends CompostableItem {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position)
    this.name = "ArugulaLeafItem"
   
    this._compostValue = 7;

    this._description = "Used for crafting"
    this._displayName = "Arugula"
    this._imageURL = "images/arugula.png"
    this.updateToolTip()
  }


  /**
    clone()
    @description make a copy of this crop
  */
  clone() {
    var clone = new ArugulaLeafItem(this._position);
    clone.quantity = this.quantity;

    clone.render()
    return clone
  }


}
