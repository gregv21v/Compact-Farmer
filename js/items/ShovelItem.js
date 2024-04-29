/**
  DirtBlockItem
*/
import { Item } from "./items.js"
import { ToolItem } from "./ToolItem.js"


export class ShovelItem extends ToolItem {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position)
    this.name = "ShovelItem"
    this._displayName = "Shovel"
    this._description = "Used to move dirt blocks"
    this._imageURL = "images/shovel.png"
    this.updateToolTip()
  }


  
  /**
    clone()
    @description make a copy of this crop
  */
  clone() {
    var clone = new ShovelItem(this._position);
    clone.quantity = this.quantity;

    clone.render()
    return clone
  }

}
